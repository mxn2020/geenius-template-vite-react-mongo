// api/users.ts
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { auditService } from "../src/lib/services/audit";

export const handler: Handler = async (event, _context) => {
  // Get origin for CORS
  const origin = event.headers.origin || 'http://localhost:8889';
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
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

    // Parse the path to determine the endpoint
    const path = event.path
      .replace('/.netlify/functions/users', '')
      .replace('/api/users', '')
      .replace('.json', '');
    
    console.log('Users API - Path parsing:', {
      originalPath: event.path,
      parsedPath: path,
      httpMethod: event.httpMethod
    });

    // GET /api/users/:userId - Get single user
    if (event.httpMethod === 'GET' && path && path.startsWith('/')) {
      const pathParts = path.substring(1).split('/');
      const userId = pathParts[0];
      const isDetailsRequest = pathParts[1] === 'details';
      
      console.log('Single user request:', {
        userId,
        isDetailsRequest,
        pathParts
      });
      
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

      // For basic request, just return user info
      if (!isDetailsRequest) {
        const basicUser = {
          id: user._id.toString(),
          name: user.name || 'Unknown',
          email: user.email,
          role: preference?.role || 'user',
          createdAt: user.createdAt,
          lastActive: preference?.updatedAt || user.updatedAt || user.createdAt,
          emailVerified: user.emailVerified || false,
          preferences: {
            theme: preference?.theme || 'light',
            emailNotifications: preference?.emailNotifications ?? true,
            language: preference?.language || 'en',
            timezone: preference?.timezone || 'UTC',
          }
        };

        console.log('Returning basic user data:', basicUser);

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify(basicUser),
        };
      }

      // For details request, include activity and sessions
      // Note: Better Auth stores userId as ObjectId in sessions, but as string in AuditLog
      const userIdString = user._id.toString();
      const { ObjectId: MongoObjectId } = await import('mongodb');
      
      const recentActivity = await db.collection('AuditLog')
        .find({ userId: userIdString })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();

      // Sessions might have userId as ObjectId (from Better Auth)
      const sessions = await db.collection('session')
        .find({ 
          $or: [
            { userId: userIdString },
            { userId: new MongoObjectId(userIdString) }
          ]
        })
        .sort({ createdAt: -1 })
        .toArray();
        
      console.log('User details query results:', {
        userId: userIdString,
        activityCount: recentActivity.length,
        sessionCount: sessions.length
      });

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
          details: log.details || log.action,
          timestamp: log.createdAt,
          ip: log.ip,
        })),
        sessions: sessions.map(session => ({
          id: session._id.toString(),
          active: new Date(session.expiresAt) > new Date(),
          createdAt: session.createdAt,
          expiresAt: session.expiresAt,
          userAgent: session.userAgent || 'Unknown',
          ip: session.ip || 'Unknown',
        })),
      };

      console.log('Returning detailed user data with activity and sessions');

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
    
    // GET /api/users - No longer supports listing all users (moved to admin API)
    if (event.httpMethod === 'GET' && (!path || path === '')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User listing requires admin access. Use /api/admin-users instead.' }),
      };
    }
    
    // Original list users code - DISABLED
    if (false) {
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

    // PATCH /api/users/:userId - No longer supported (moved to admin API)
    if (event.httpMethod === 'PATCH' && path.startsWith('/')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User updates require admin access. Use /api/admin-users instead.' }),
      };
    }
    
    // Original update code - DISABLED
    if (false) {
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

      const updates = JSON.parse(event.body || '{}');
      const { role } = updates;

      if (role && !['user', 'admin'].includes(role)) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'Invalid role' }),
        };
      }

      // Get current user from session for audit logging
      const cookies = event.headers.cookie || '';
      let sessionTokenCookie = cookies.split(';')
        .find(c => c.trim().startsWith('better-auth.session_token='))
        ?.split('=')[1];
      
      // URL decode and extract just the token part (before the dot)
      let sessionToken: string | undefined;
      if (sessionTokenCookie) {
        sessionTokenCookie = decodeURIComponent(sessionTokenCookie);
        const tokenParts = sessionTokenCookie.split('.');
        sessionToken = tokenParts[0]; // Just the token, not the signature
      }
      
      let currentUserId = 'system';
      if (sessionToken) {
        const session = await db.collection('session').findOne({ token: sessionToken });
        if (session) currentUserId = session.userId;
      }

      // Update user preferences (role)
      if (role) {
        const oldUserPref = await db.collection('UserPreference').findOne({ userId });
        const oldRole = oldUserPref?.role || 'user';
        
        await db.collection('UserPreference').updateOne(
          { userId },
          { 
            $set: { 
              role,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        
        // Log role change
        await auditService.logUserAction(currentUserId, 'role_changed', {
          targetUserId: userId,
          oldRole,
          newRole: role,
        }, event);
      }

      // Return updated user
      const { ObjectId } = await import('mongodb');
      let user;
      try {
        user = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        user = await db.collection('user').findOne({ _id: userId });
      }

      const preference = await db.collection('UserPreference').findOne({ userId });

      const updatedUser = {
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
      };

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(updatedUser),
      };
    }

    // DELETE /api/users/:userId - No longer supported (moved to admin API)
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User deletion requires admin access. Use /api/admin-users instead.' }),
      };
    }
    
    // Original delete code - DISABLED
    if (false) {
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

      // Get current user from session for audit logging
      const cookies = event.headers.cookie || '';
      let sessionTokenCookie = cookies.split(';')
        .find(c => c.trim().startsWith('better-auth.session_token='))
        ?.split('=')[1];
      
      // URL decode and extract just the token part (before the dot)
      let sessionToken: string | undefined;
      if (sessionTokenCookie) {
        sessionTokenCookie = decodeURIComponent(sessionTokenCookie);
        const tokenParts = sessionTokenCookie.split('.');
        sessionToken = tokenParts[0]; // Just the token, not the signature
      }
      
      let currentUserId = 'system';
      if (sessionToken) {
        const session = await db.collection('session').findOne({ token: sessionToken });
        if (session) currentUserId = session.userId;
      }

      const { ObjectId } = await import('mongodb');
      
      // Get user info before deletion for audit log
      let userToDelete;
      try {
        userToDelete = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        userToDelete = await db.collection('user').findOne({ _id: userId });
      }
      
      // Delete user from Better Auth's user collection
      try {
        await db.collection('user').deleteOne({ _id: new ObjectId(userId) });
      } catch (e) {
        await db.collection('user').deleteOne({ _id: userId });
      }

      // Delete related data
      await db.collection('UserPreference').deleteOne({ userId });
      await db.collection('session').deleteMany({ userId });
      await db.collection('account').deleteMany({ userId });
      
      // Delete user's posts and comments
      await db.collection('Post').deleteMany({ authorId: userId });
      await db.collection('Comment').deleteMany({ authorId: userId });
      
      // Log user deletion
      await auditService.logUserAction(currentUserId, 'user_deleted', {
        targetUserId: userId,
        targetUserEmail: userToDelete?.email,
        targetUserName: userToDelete?.name,
      }, event);

      return {
        statusCode: 204,
        headers: { 
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: '',
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