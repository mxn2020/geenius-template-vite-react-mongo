import { Handler } from '@netlify/functions';
import { createAuthConfig, createMongoConnection } from '../../src/lib/auth-config';

// Initialize Better Auth
let authInstance: any;

async function getAuth() {
  if (!authInstance) {
    const db = await createMongoConnection();
    authInstance = createAuthConfig(db);
  }
  return authInstance;
}

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const allowedOrigins = [
    process.env.URL,
    process.env.DEPLOY_PRIME_URL,
    'http://localhost:5173',
    'https://localhost:5173',
  ].filter(Boolean);
  
  const origin = event.headers.origin;
  const corsOrigin = allowedOrigins.includes(origin) ? origin : 'http://localhost:5173';
  
  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Handle custom endpoints before Better Auth
    if (event.path.includes('/api/auth/providers')) {
      const providers = {
        github: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
        google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      };
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(providers),
      };
    }

    const auth = await getAuth();
    
    // Create proper URL for the request
    const url = new URL(event.path, `https://${event.headers.host || 'localhost'}`);
    if (event.queryStringParameters) {
      Object.entries(event.queryStringParameters).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });
    }

    // Create a proper Request object
    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: new Headers(event.headers),
      body: event.body || undefined,
    });

    // Handle the auth request
    const response = await auth.handler(request);

    // Convert Response to Netlify format
    const responseHeaders: Record<string, string> = {};
    if (response.headers) {
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
    }

    return {
      statusCode: response.status,
      headers: {
        ...headers,
        ...responseHeaders,
      },
      body: await response.text(),
    };
  } catch (error) {
    console.error('Auth handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};