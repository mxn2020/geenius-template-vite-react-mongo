# Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/geenius-template"
MONGODB_URI="mongodb://localhost:27017/geenius-template"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here-change-this-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Application URLs
VITE_APP_URL="http://localhost:5176"
VITE_API_URL="http://localhost:3000"
```

### 3. MongoDB Setup
First, set up a local MongoDB instance. See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions.

**Quick setup (macOS with Homebrew):**
```bash
# Install and start MongoDB
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Quick setup (Docker):**
```bash
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 4. Database Schema Setup
```bash
# Generate Prisma client
pnpm db:generate

# Push schema to MongoDB
pnpm db:push
```

### 5. Development

#### Option A: Run with Netlify Dev (Recommended)
```bash
pnpm dev:netlify
```

#### Option B: Run Frontend Only
```bash
pnpm dev
```

Note: Option A includes serverless functions, while Option B is frontend-only.

### 6. Access the Application

- **Frontend**: http://localhost:5176
- **Netlify Dev Server**: http://localhost:8889 (includes functions)
- **Auth endpoints**: http://localhost:8889/api/auth

## 🔧 Features

### Authentication
- ✅ Email/password registration and login
- ✅ Protected routes with automatic redirects
- ✅ Session management
- ⚠️ Social auth (requires OAuth setup)

### Dev Container
- ✅ Component selection and feedback
- ✅ Change management system
- ✅ Live feedback collection
- ✅ Component registry

### Database
- ✅ MongoDB with Prisma ORM
- ✅ Type-safe database access
- ✅ Automatic schema synchronization

## 🔍 Troubleshooting

### Common Issues

1. **Session errors in console**
   - This is expected if the Netlify dev server isn't running
   - Start the server with `pnpm dev:netlify`

2. **Component registry errors**
   - Check that all button components have proper `devId` props
   - Verify component IDs are registered in `src/registry.ts`

3. **MongoDB connection issues**
   - Ensure MongoDB is running locally
   - Check the `DATABASE_URL` in your `.env` file
   - For MongoDB Atlas, use the connection string from your cluster

4. **Build errors**
   - Run `pnpm build` to check for TypeScript errors
   - Fix any type issues before development

### OAuth Setup (Optional)

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `http://localhost:8889/api/auth/callback/github`
4. Add Client ID and Secret to `.env`

#### Google OAuth
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID
3. Set Authorized redirect URI: `http://localhost:8889/api/auth/callback/google`
4. Add Client ID and Secret to `.env`

## 📚 Documentation

- [AI Agent Guide](./AI_AGENT_GUIDE.md) - Comprehensive guide for AI agents
- [Better Auth Docs](https://better-auth.com) - Authentication framework documentation
- [Prisma Docs](https://www.prisma.io/docs) - Database toolkit documentation

## 🎯 Next Steps

1. **Customize the Landing Page** - Edit `src/components/Landing.tsx`
2. **Add More Routes** - Extend `src/App.tsx` with new routes
3. **Create New Components** - Add components and register them in `src/registry.ts`
4. **Set up OAuth** - Configure Google/GitHub authentication
5. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform

## 🤝 Development Mode

1. **Enable Dev Mode** - Press `Ctrl+Shift+D` or click the toggle
2. **Select Components** - Click on any component to select it
3. **Add Feedback** - Use the popover to create change requests
4. **Manage Changes** - Use the sidebar to organize feedback
5. **Submit Changes** - Send feedback to your development endpoint

Enjoy building with the Geenius Template! 🚀