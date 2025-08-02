// scripts/create-admin-account.ts
// Run with: npx tsx scripts/create-admin-account.ts

import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function createAdminAccount() {
  console.log('🚀 Creating admin account...');
  console.log('Email:', ADMIN_EMAIL);
  console.log('Name:', ADMIN_NAME);
  console.log('Password:', ADMIN_PASSWORD.replace(/./g, '*'));

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/geenius-template';
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();
    
    // Check if user already exists
    const existingUser = await db.collection('user').findOne({ email: ADMIN_EMAIL });
    if (existingUser) {
      console.log('⚠️  User already exists with this email');
      
      // Update existing user to admin using MongoDB directly
      try {
        await db.collection('UserPreference').updateOne(
          { userId: existingUser.id },
          { 
            $set: { 
              role: 'admin',
              updatedAt: new Date()
            },
            $setOnInsert: {
              userId: existingUser.id,
              theme: 'light',
              emailNotifications: true,
              language: 'en',
              timezone: 'UTC',
              createdAt: new Date()
            }
          },
          { upsert: true }
        );
        
        console.log('✅ Existing user updated to admin role');
        console.log('User ID:', existingUser.id);
      } catch {
        console.warn('⚠️  Could not update user preferences (MongoDB replica set may be required)');
        console.log('   You can manually grant admin role using: npm run admin:grant', existingUser.id);
      }
      return;
    }

    // Hash password using Argon2 (Better Auth's default)
    const hashedPassword = await hash(ADMIN_PASSWORD, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate user ID
    const userId = crypto.randomBytes(16).toString('hex');

    // Create user in Better Auth's user collection
    const newUser = {
      id: userId,
      email: ADMIN_EMAIL,
      emailVerified: true,
      name: ADMIN_NAME,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('user').insertOne(newUser);
    console.log('✅ User created in Better Auth');

    // Create account (for password authentication)
    const accountId = crypto.randomBytes(16).toString('hex');
    const account = {
      id: accountId,
      userId: userId,
      accountId: ADMIN_EMAIL, // Better Auth uses email as accountId for credential provider
      providerId: 'credential', // Better Auth's credential provider
      accessToken: null,
      refreshToken: null,
      idToken: null,
      expiresAt: null,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('account').insertOne(account);
    console.log('✅ Account created with password');

    // Create user preferences with admin role using MongoDB directly
    try {
      await db.collection('UserPreference').insertOne({
        userId: userId,
        role: 'admin',
        theme: 'light',
        emailNotifications: true,
        language: 'en',
        timezone: 'UTC',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ User preferences created with admin role');
    } catch {
      // If it fails due to replica set, we'll still continue
      console.warn('⚠️  Could not create user preferences (MongoDB replica set may be required)');
      console.log('   You can manually grant admin role using: npm run admin:grant', userId);
    }

    // Create audit log entry using MongoDB directly
    try {
      await db.collection('AuditLog').insertOne({
        userId: userId,
        action: 'admin_account_created',
        details: { 
          email: ADMIN_EMAIL,
          createdBy: 'setup_script',
        },
        success: true,
        createdAt: new Date(),
      });
      console.log('✅ Audit log entry created');
    } catch {
      // Non-critical, continue
      console.warn('⚠️  Could not create audit log entry')
    }

    console.log('\n🎉 Admin account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('User ID:', userId);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now log in with these credentials at /login');

  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    process.exit(1);
  } finally {
    await client.close();
    await prisma.$disconnect();
  }
}

// Show usage if help flag is provided
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Admin Account Creation Script
============================

This script creates a complete admin account in the Better Auth system.

Usage:
  npx tsx scripts/create-admin-account.ts

Environment Variables (optional):
  ADMIN_EMAIL     - Email for the admin account (default: admin@example.com)
  ADMIN_PASSWORD  - Password for the admin account (default: admin123456)
  ADMIN_NAME      - Name for the admin account (default: Admin User)

Examples:
  # Create with defaults
  npx tsx scripts/create-admin-account.ts

  # Create with custom credentials
  ADMIN_EMAIL=superadmin@company.com ADMIN_PASSWORD=SecurePass123! npx tsx scripts/create-admin-account.ts
`);
  process.exit(0);
}

createAdminAccount();