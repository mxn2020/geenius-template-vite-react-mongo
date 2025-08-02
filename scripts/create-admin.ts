// scripts/create-admin.ts
// Run with: npx tsx scripts/create-admin.ts <userId>

import { MongoClient } from 'mongodb';

async function createAdmin() {
  const userId = process.argv[2];
  
  if (!userId) {
    console.error('Please provide a user ID as argument');
    console.log('Usage: npx tsx scripts/create-admin.ts <userId>');
    process.exit(1);
  }

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/geenius-template';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    // Create or update user preferences with admin role
    const result = await db.collection('UserPreference').updateOne(
      { userId },
      { 
        $set: { 
          role: 'admin',
          updatedAt: new Date()
        },
        $setOnInsert: {
          userId,
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('✅ Admin role granted successfully!');
    console.log('User ID:', userId);
    console.log('Operation:', result.upsertedCount ? 'Created new preferences' : 'Updated existing preferences');
    
    // Create audit log entry
    try {
      await db.collection('AuditLog').insertOne({
        userId,
        action: 'role_change',
        details: { newRole: 'admin', changedBy: 'script' },
        success: true,
        createdAt: new Date(),
      });
      console.log('📝 Audit log entry created');
    } catch {
      console.log('⚠️  Could not create audit log (replica set may be required)');
    }

  } catch (error: any) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await client.close();
  }
}

createAdmin();