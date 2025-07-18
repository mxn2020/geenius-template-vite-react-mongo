// api/auth.ts
import { Handler } from "@netlify/functions";
import { auth } from "../src/lib/auth";

export const handler: Handler = async (event, context) => {
  console.log('=== NETLIFY AUTH FUNCTION START ===');
  console.log('🔗 Raw URL:', event.rawUrl);
  console.log('🔧 HTTP Method:', event.httpMethod);
  console.log('📍 Path:', event.path);
  console.log('🔍 Query Parameters:', event.queryStringParameters);
  console.log('📤 Headers:', JSON.stringify(event.headers, null, 2));
  console.log('📦 Body length:', event.body ? event.body.length : 0);
  console.log('🏷️ Content-Type:', event.headers['content-type']);

  // Enhanced environment logging
  console.log('🌍 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL ? '[REDACTED]' : 'NOT_SET',
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? '[REDACTED]' : 'NOT_SET',
    NETLIFY_SITE_URL: process.env.NETLIFY_SITE_URL,
    URL: process.env.URL,
    DEPLOY_URL: process.env.DEPLOY_URL,
  });

  // Check if this is the right path
  console.log('🛣️ Path analysis:', {
    eventPath: event.path,
    expectedPaths: ['/api/auth', '/api/auth/sign-up/email'],
    isAuthPath: event.path.startsWith('/api/auth'),
    exactPath: event.path === '/api/auth',
    isSignUpPath: event.path.includes('sign-up'),
  });

  try {
    // Handle path routing - BetterAuth expects the full path
    let requestUrl = event.rawUrl;
    
    // If the path doesn't match what we expect, log it
    if (!event.path.startsWith('/api/auth')) {
      console.log('⚠️ Unexpected path! Expected /api/auth/* but got:', event.path);
    }

    // Check if this might be a sub-path issue
    if (event.path !== '/api/auth' && !event.path.startsWith('/api/auth/')) {
      console.log('🔄 Path mismatch - might need catch-all routing');
    }

    const url = new URL(requestUrl);
    console.log('🔍 Parsed URL:', {
      origin: url.origin,
      pathname: url.pathname,
      search: url.search,
      protocol: url.protocol,
      host: url.host,
      fullUrl: url.toString(),
    });

    // Check if BetterAuth base URL matches
    const expectedAuthUrl = process.env.BETTER_AUTH_URL;
    if (expectedAuthUrl) {
      const expectedUrl = new URL(expectedAuthUrl);
      console.log('🔗 BetterAuth URL comparison:', {
        expected: expectedAuthUrl,
        current: url.origin,
        match: url.origin === expectedUrl.origin,
      });
    }

    const request = new Request(requestUrl, {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body ? event.body : undefined,
    });

    console.log('📨 Request created:', {
      method: request.method,
      url: request.url,
      hasBody: !!request.body,
      bodyPreview: event.body ? event.body.substring(0, 200) : 'NO_BODY',
    });

    // Check if auth handler exists and is configured
    console.log('🔍 Auth handler check:', {
      authExists: !!auth,
      authType: typeof auth,
      hasHandler: !!(auth && auth.handler),
      handlerType: auth && auth.handler ? typeof auth.handler : 'undefined',
    });

    console.log('🚀 Calling auth.handler...');
    const response = await auth.handler(request);
    
    console.log('📥 Auth handler response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      redirected: response.redirected,
      type: response.type,
      url: response.url,
    });

    // Log response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    console.log('📤 Response headers:', responseHeaders);

    // Get response body
    let responseBody;
    try {
      responseBody = await response.text();
      console.log('📦 Response body length:', responseBody.length);
      
      // Try to parse as JSON for better logging
      try {
        const jsonBody = JSON.parse(responseBody);
        console.log('📝 Response JSON:', jsonBody);
      } catch {
        console.log('📝 Response body preview:', responseBody.substring(0, 500));
      }
    } catch (bodyError) {
      console.log('❌ Error reading response body:', bodyError);
      responseBody = '';
    }

    const result = {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
    };

    console.log('✅ Netlify function response:', {
      statusCode: result.statusCode,
      headersCount: Object.keys(result.headers).length,
      bodyLength: result.body.length,
      isError: result.statusCode >= 400,
    });

    console.log('=== NETLIFY AUTH FUNCTION END ===');
    return result;

  } catch (error: any) {
    console.log('💥 Netlify function error:', error);
    console.log('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });

    // Check if it's a specific BetterAuth error
    if (error.message.includes('auth') || error.message.includes('database')) {
      console.log('🔍 Possible BetterAuth configuration issue');
    }

    console.log('=== NETLIFY AUTH FUNCTION ERROR END ===');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        timestamp: new Date().toISOString(),
        path: event.path,
        method: event.httpMethod,
      }),
    };
  }
};