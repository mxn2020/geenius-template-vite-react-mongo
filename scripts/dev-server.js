#!/usr/bin/env node

// Development server startup script
// Checks for common issues and provides helpful warnings

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distPath = path.join(__dirname, '..', 'dist');

// Check if dist folder exists
if (fs.existsSync(distPath)) {
  console.log('\n⚠️  Warning: dist folder detected!');
  console.log('This can cause issues with Netlify Dev serving the wrong files.');
  console.log('Removing dist folder...\n');
  
  try {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ dist folder removed\n');
  } catch (error) {
    console.error('❌ Failed to remove dist folder:', error.message);
    console.log('Please manually delete the dist folder and try again.\n');
  }
}

// Start Netlify Dev
console.log('🚀 Starting Netlify Dev server...\n');
try {
  execSync('netlify dev', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
} catch (error) {
  // execSync will throw when the process is terminated (Ctrl+C)
  // This is expected behavior, so we can safely ignore it
  if (error.signal !== 'SIGINT') {
    console.error('Error starting dev server:', error.message);
    process.exit(1);
  }
}