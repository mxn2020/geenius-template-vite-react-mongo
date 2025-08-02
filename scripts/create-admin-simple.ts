// scripts/create-admin-simple.ts
// A simpler admin creation script that avoids MongoDB replica set issues
// Run with: npx tsx scripts/create-admin-simple.ts

import { MongoClient } from 'mongodb';
import { hash } from '@node-rs/argon2';
import crypto from 'crypto';

// Configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function createAdmin() {
  console.log('🚀 Creating admin account (simple version)...');
  console.log('Email:', ADMIN_EMAIL);
  console.log('Name:', ADMIN_NAME);

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/geenius-template';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();
    
    // Check if user already exists
    const existingUser = await db.collection('user').findOne({ email: ADMIN_EMAIL });
    if (existingUser) {
      console.log('✅ User already exists with ID:', existingUser.id);
      console.log('\nTo grant admin role, run:');
      console.log(`npm run admin:grant ${existingUser.id}`);
      return;
    }

    // Generate user ID
    const userId = crypto.randomBytes(16).toString('hex');

    // Hash password
    const hashedPassword = await hash(ADMIN_PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Create user
    await db.collection('user').insertOne({
      id: userId,
      email: ADMIN_EMAIL,
      emailVerified: true,
      name: ADMIN_NAME,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create account for password login
    await db.collection('account').insertOne({
      id: crypto.randomBytes(16).toString('hex'),
      userId: userId,
      accountId: ADMIN_EMAIL,
      providerId: 'credential',
      accessToken: null,
      refreshToken: null,
      idToken: null,
      expiresAt: null,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('\n✅ Admin account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('User ID:', userId);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nTo grant admin role, run:');
    console.log(`npm run admin:grant ${userId}`);

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

createAdmin();