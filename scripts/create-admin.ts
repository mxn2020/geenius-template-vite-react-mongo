// scripts/create-admin.ts
// Create admin account using Better Auth's expected structure
// Run with: npx tsx scripts/create-admin.ts

import { MongoClient } from 'mongodb';
import { hash } from '@node-rs/argon2';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123456';
const ADMIN_NAME = 'Admin User';

async function createAdmin() {
  const client = new MongoClient('mongodb://localhost:27017/geenius-template');
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('Creating admin account...\n');
    
    // Clean up any existing admin
    await db.collection('user').deleteMany({ email: ADMIN_EMAIL });
    await db.collection('account').deleteMany({
      $or: [
        { accountId: ADMIN_EMAIL },
        { providerId: 'credential', accountId: { $regex: /^[a-f0-9]{24}$/ } }
      ]
    });
    
    // Create user (Better Auth uses _id as user identifier)
    const userResult = await db.collection('user').insertOne({
      email: ADMIN_EMAIL,
      emailVerified: true,
      name: ADMIN_NAME,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const userId = userResult.insertedId;
    console.log('✅ User created');
    console.log('   ID:', userId);
    
    // Hash password
    const passwordHash = await hash(ADMIN_PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    
    // Create account (Better Auth uses email as accountId for credential provider)
    await db.collection('account').insertOne({
      userId: userId.toString(),
      accountId: ADMIN_EMAIL,
      providerId: 'credential',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    console.log('✅ Account created');
    
    // Set admin role
    await db.collection('UserPreference').updateOne(
      { userId: userId.toString() },
      { 
        $set: { 
          role: 'admin',
          updatedAt: new Date()
        },
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
    
    console.log('✅ Admin role set');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin account created successfully!');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

createAdmin();