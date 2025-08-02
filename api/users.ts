// api/users.ts
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
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    // GET /api/users - List all users with pagination
    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const page = parseInt(params.page || '1', 10);
      const limit = parseInt(params.limit || '10', 10);
      const search = params.search || '';
      const role = params.role || '';
      const skip = (page - 1) * limit;

      // Build search query
      const searchQuery: any = {};
      if (search) {
        searchQuery.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      // Get users from Better Auth's user collection
      const users = await db.collection('user')
        .find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .toArray();

      // Get total count for pagination
      const totalCount = await db.collection('user').countDocuments(searchQuery);

      // Get user preferences for roles
      const userIds = users.map(u => u._id.toString());
      const preferences = await db.collection('UserPreference')
        .find({ userId: { $in: userIds } })
        .toArray();

      // Create a map for quick lookup
      const prefMap = new Map(preferences.map(p => [p.userId, p]));

      // Combine user data with preferences
      const enrichedUsers = users.map(user => {
        const pref = prefMap.get(user._id.toString());
        return {
          id: user._id.toString(),
          name: user.name || 'Unknown',
          email: user.email,
          role: pref?.role || 'user',
          createdAt: user.createdAt,
          lastActive: pref?.updatedAt || user.updatedAt || user.createdAt,
          emailVerified: user.emailVerified || false,
        };
      });

      // Filter by role if specified
      const filteredUsers = role 
        ? enrichedUsers.filter(u => u.role === role)
        : enrichedUsers;

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          users: filteredUsers,
          pagination: {
            page,
            limit,
            totalCount: role ? filteredUsers.length : totalCount,
            totalPages: Math.ceil((role ? filteredUsers.length : totalCount) / limit),
          }
        }),
      };
    }

    // GET /api/users/:userId - Get single user details
    const path = event.path
      .replace('/.netlify/functions/users', '')
      .replace('/api/users', '')
      .replace('.json', '');
    
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

      // Find user by ID
      const { ObjectId } = await import('mongodb');
      let user;
      try {
        user = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        // If not a valid ObjectId, try as string
        user = await db.collection('user').findOne({ _id: userId });
      }

      if (!user) {
        return {
          statusCode: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User not found' }),
        };
      }

      // Get user preferences
      const preference = await db.collection('UserPreference').findOne({ userId: user._id.toString() });

      // Get user's recent activity (audit logs)
      const recentActivity = await db.collection('AuditLog')
        .find({ userId: user._id.toString() })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();

      // Get user's sessions
      const sessions = await db.collection('session')
        .find({ userId: user._id.toString() })
        .sort({ createdAt: -1 })
        .toArray();

      const enrichedUser = {
        id: user._id.toString(),
        name: user.name || 'Unknown',
        email: user.email,
        role: preference?.role || 'user',
        createdAt: user.createdAt,
        lastActive: preference?.updatedAt || user.updatedAt || user.createdAt,
        emailVerified: user.emailVerified || false,
        preferences: preference || {
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
        },
        recentActivity: recentActivity.map(log => ({
          id: log._id.toString(),
          action: log.action,
          details: log.details,
          timestamp: log.timestamp,
          ip: log.ip,
        })),
        sessions: sessions.map(session => ({
          id: session._id.toString(),
          active: new Date(session.expiresAt) > new Date(),
          createdAt: session.createdAt,
          expiresAt: session.expiresAt,
          userAgent: session.userAgent,
          ip: session.ip,
        })),
      };

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(enrichedUser),
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
    console.error('Users API error:', error);
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