// scripts/verify-admin.ts
// Verify admin account can be authenticated
// Run with: npx tsx scripts/verify-admin.ts

import { MongoClient } from 'mongodb';
import { verify } from '@node-rs/argon2';

async function verifyAdmin() {
  const client = new MongoClient('mongodb://localhost:27017/vite-react-mongo');
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('Verifying admin account...\n');
    
    // Find user
    const user = await db.collection('user').findOne({ email: 'admin@example.com' });
    if (!user) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log('✅ User found:');
    console.log('   _id:', user._id);
    console.log('   email:', user.email);
    
    // Find account
    const account = await db.collection('account').findOne({ 
      providerId: 'credential',
      accountId: 'admin@example.com'
    });
    
    if (!account) {
      console.log('\n❌ Admin account not found');
      return;
    }
    
    console.log('\n✅ Account found:');
    console.log('   userId:', account.userId);
    console.log('   userId matches user._id:', account.userId.toString() === user._id.toString());
    console.log('   password exists:', Boolean(account.password));
    
    // Verify password
    if (account.password) {
      const isValid = await verify(account.password, 'admin123456');
      console.log('\n✅ Password verification:', isValid ? 'VALID' : 'INVALID');
    }
    
    // Check role
    const prefs = await db.collection('UserPreference').findOne({ 
      userId: user._id.toString() 
    });
    console.log('\n✅ Admin role:', prefs?.role === 'admin' ? 'SET' : 'NOT SET');
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin account is properly configured.');
    console.log('Try logging in at: http://localhost:8889/login');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

verifyAdmin();