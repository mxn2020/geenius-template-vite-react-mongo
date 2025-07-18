# Geenius Template - Vite + React + MongoDB + Better Auth

A modern, full-stack React template with authentication, database integration, and AI-powered development feedback system.

## 🚀 Features

- **⚡ Vite** - Lightning-fast development and build tool
- **⚛️ React 18** - Latest React with TypeScript support
- **🔐 Better Auth** - Modern authentication with MongoDB adapter
- **🗄️ MongoDB + Prisma** - NoSQL database with type-safe ORM
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 Radix UI** - Accessible component primitives
- **🚀 React Router** - Client-side routing
- **🤖 Dev Container** - Live feedback and change management system

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas) - see [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- pnpm (recommended) or npm

## 🛠️ Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd geenius-template-vite-react-mongo
   pnpm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Update .env with your MongoDB URI and auth secrets
   ```

3. **MongoDB Setup**
   ```bash
   # Quick setup (macOS with Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   
   # Or with Docker
   docker run -d --name mongodb -p 27017:27017 mongo:latest
   
   # Test connection
   pnpm db:test
   ```

4. **Database Schema Setup**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Push schema to MongoDB (development)
   pnpm db:push
   ```

5. **Development**
   ```bash
   # Start with Netlify Dev (includes functions)
   pnpm dev:netlify
   
   # Or start frontend only
   pnpm dev
   ```

- **Frontend**: http://localhost:5173
- **Netlify Dev Server**: http://localhost:8889 (includes functions)
- **Auth endpoints**: http://localhost:8889/api/auth

## 📁 Project Structure

```
vite-react-mongo/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── lib/            # Configuration and setup
│   └── App.tsx         # Main application component
├── prisma/
│   └── schema.prisma   # Database schema
├── public/             # Static assets
└── netlify/
    └── functions/      # Serverless functions
```

## 💾 Database

This template uses MongoDB with Prisma ORM. The schema includes:

- **User model** - Basic user information
- **Post model** - Blog posts with user relationships

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio

# Reset database (careful - this deletes all data)
npx prisma db push --force-reset
```

## 🌐 API Routes

The application includes API endpoints for:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post

## 🔧 Available Scripts

```bash
# Development
pnpm dev            # Start Vite development server
pnpm dev:netlify    # Start Netlify dev server with functions

# Build
pnpm build          # Build for production
pnpm preview        # Preview production build

# Database
pnpm db:test        # Test MongoDB connection
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Push schema to database
pnpm db:studio      # Open Prisma Studio

# Linting
pnpm lint           # Run ESLint
```

## 📦 Dependencies

### Core
- **React** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety

### Database
- **Prisma** - Database ORM
- **@prisma/client** - Generated database client
- **mongodb** - MongoDB driver

### Development
- **ESLint** - Code linting
- **@types/react** - React type definitions

## 🚀 Deployment

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

### Vercel

1. **Deploy with Vercel CLI**
   ```bash
   npx vercel
   ```

2. **Or connect via Vercel Dashboard**
   - Import your repository
   - Vercel will auto-detect Vite configuration
   - Add environment variables

## 🔐 Environment Variables

Required environment variables:

```env
DATABASE_URL="mongodb://localhost:27017/vite-react-mongo"
VITE_API_URL="http://localhost:3000/api"
```

Optional variables:

```env
VITE_APP_NAME="Vite React MongoDB App"
JWT_SECRET="your-jwt-secret"
CORS_ORIGIN="http://localhost:5173"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Prisma](https://www.prisma.io/) - Database toolkit for TypeScript and Node.js
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database

---

Built with ❤️ for modern web development