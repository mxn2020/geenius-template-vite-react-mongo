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
    const auth = await getAuth();
    
    // Convert Netlify event to a request-like object
    const request = {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers,
      body: event.body,
    };

    // Create a response object
    const response = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (name: string, value: string) => {
        response.headers[name] = value;
      },
      status: (code: number) => {
        response.statusCode = code;
        return response;
      },
      json: (data: any) => {
        response.headers['Content-Type'] = 'application/json';
        response.body = JSON.stringify(data);
        return response;
      },
      send: (data: any) => {
        response.body = typeof data === 'string' ? data : JSON.stringify(data);
        return response;
      },
    };

    // Handle the auth request
    await auth.handler(request as any, response as any);

    return {
      statusCode: response.statusCode,
      headers: {
        ...headers,
        ...response.headers,
      },
      body: response.body,
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