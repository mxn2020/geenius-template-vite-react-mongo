import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from '../src/lib/auth';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.VITE_APP_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Better Auth handler - handles all auth routes
app.all('/api/auth/*', (req, res) => {
  return auth.handler(req, res);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example protected API endpoint
app.get('/api/profile', async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({
      user: session.user,
      session: session.session,
    });
  } catch (error) {
    console.error('Profile endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🔐 Auth endpoints available at http://localhost:${port}/api/auth/*`);
});

export default app;