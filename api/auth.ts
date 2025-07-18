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

  // Log environment variables (without sensitive data)
  console.log('🌍 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL ? '[REDACTED]' : 'NOT_SET',
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? '[REDACTED]' : 'NOT_SET',
  });

  try {
    const url = new URL(event.rawUrl);
    console.log('🔍 Parsed URL:', {
      origin: url.origin,
      pathname: url.pathname,
      search: url.search,
      protocol: url.protocol,
      host: url.host,
    });

    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body ? event.body : undefined,
    });

    console.log('📨 Request created:', {
      method: request.method,
      url: request.url,
      hasBody: !!request.body,
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
    const responseBody = await response.text();
    console.log('📦 Response body length:', responseBody.length);
    
    // Log first 500 characters of response body (to avoid logging sensitive data)
    if (responseBody.length > 0) {
      console.log('📝 Response body preview:', responseBody.substring(0, 500));
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
    });

    console.log('=== NETLIFY AUTH FUNCTION END ===');
    return result;

  } catch (error: any) {
    console.log('💥 Netlify function error:', error);
    console.log('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    console.log('=== NETLIFY AUTH FUNCTION ERROR END ===');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};