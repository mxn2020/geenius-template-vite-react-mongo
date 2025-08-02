// scripts/create-admin.ts
// Run with: npx tsx scripts/create-admin.ts <userId>

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdmin() {
  const userId = process.argv[2];
  
  if (!userId) {
    console.error('Please provide a user ID as argument');
    console.log('Usage: npx tsx scripts/create-admin.ts <userId>');
    process.exit(1);
  }

  try {
    // Create or update user preferences with admin role
    const userPref = await prisma.userPreference.upsert({
      where: { userId },
      update: { role: 'admin' },
      create: {
        userId,
        role: 'admin',
        theme: 'light',
        emailNotifications: true,
        language: 'en',
        timezone: 'UTC',
      },
    });

    console.log('✅ Admin role granted successfully!');
    console.log('User ID:', userId);
    console.log('Role:', userPref.role);
    
    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'role_change',
        details: { newRole: 'admin', changedBy: 'script' },
        success: true,
      },
    });

    console.log('📝 Audit log entry created');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();