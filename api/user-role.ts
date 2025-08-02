// api/user-role.ts
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

export const handler: Handler = async (event, _context) => {
  // Get origin for CORS
  const origin = event.headers.origin || 'http://localhost:8889';
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";
  console.log('[user-role API] Connecting to:', mongoUri);
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();
    const path = event.path.replace('/.netlify/functions/user-role', '');
    
    // GET /api/user-role/:userId
    if (event.httpMethod === 'GET' && path.startsWith('/')) {
      const userId = path.substring(1);
      
      if (!userId) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User ID required' }),
        };
      }

      // Find user preferences
      console.log('[user-role API] Looking for userId:', userId);
      let userPref = await db.collection('UserPreference').findOne({ userId });
      console.log('[user-role API] Found preference:', userPref);
      
      // Create default preferences if not found
      if (!userPref) {
        const newPref = {
          userId,
          role: 'user',
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.collection('UserPreference').insertOne(newPref);
        userPref = newPref;
      }

      const role = userPref.role || 'user';

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ role }),
      };
    }

    // PUT /api/user-role/:userId
    if (event.httpMethod === 'PUT' && path.startsWith('/')) {
      const userId = path.substring(1);
      const body = JSON.parse(event.body || '{}');
      const { role } = body;

      if (!userId || !role) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User ID and role required' }),
        };
      }

      await db.collection('UserPreference').updateOne(
        { userId },
        { 
          $set: { role, updatedAt: new Date() },
          $setOnInsert: {
            theme: 'light',
            emailNotifications: true,
            language: 'en',
            timezone: 'UTC',
            createdAt: new Date()
          }
        },
        { upsert: true }
      );

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 404,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error: any) {
    console.error('User role API error:', error);
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await client.close();
  }
};