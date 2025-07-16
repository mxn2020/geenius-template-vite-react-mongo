# Vite React MongoDB Template

> Modern React app with Vite, MongoDB, and Prisma ORM

## 🚀 Features

- **⚡ Vite** - Fast development with Hot Module Replacement
- **⚛️ React 18** - Modern React with hooks and concurrent features
- **🗄️ MongoDB** - NoSQL database with flexible schema
- **🔷 Prisma** - Type-safe database access with auto-generated client
- **📦 TypeScript** - Full type safety throughout the application
- **🎨 Modern UI** - Clean, responsive design
- **🔧 Developer Experience** - ESLint, hot reload, and easy setup

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vite-react-mongo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the MongoDB connection string:
   ```env
   DATABASE_URL="mongodb://localhost:27017/vite-react-mongo"
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Push database schema** (for MongoDB)
   ```bash
   npx prisma db push
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

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