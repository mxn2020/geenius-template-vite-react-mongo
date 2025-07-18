# MongoDB Local Setup Guide

## Option 1: MongoDB Community Server (Recommended)

### Installation

#### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Stop MongoDB service (when needed)
brew services stop mongodb-community
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will run as a Windows service automatically

#### Linux (Ubuntu/Debian)
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Verification
```bash
# Check if MongoDB is running
mongosh --eval "db.runCommand({connectionStatus: 1})"

# Or connect to MongoDB shell
mongosh
```

### Default Connection
- **URL**: `mongodb://localhost:27017`
- **Database**: Will be created automatically when you first write data

## Option 2: Docker (Easy Setup)

### Single Command Setup
```bash
# Run MongoDB in Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# Stop MongoDB
docker stop mongodb

# Start MongoDB (after stopping)
docker start mongodb

# Remove container (will delete data)
docker rm mongodb
```

### Docker Compose (Recommended for Docker users)
Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    networks:
      - app-network

volumes:
  mongodb_data:

networks:
  app-network:
    driver: bridge
```

```bash
# Start MongoDB
docker-compose up -d

# Stop MongoDB
docker-compose down

# View logs
docker-compose logs mongodb
```

If using authentication, update your `.env`:
```env
MONGODB_URI="mongodb://admin:password@localhost:27017/geenius-template?authSource=admin"
```

## Option 3: MongoDB Atlas (Cloud)

### Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Update `.env` with Atlas connection string

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/geenius-template"
```

## Configuration for Development

### Update Environment Variables
```env
# Local MongoDB (no auth)
MONGODB_URI="mongodb://localhost:27017/geenius-template"

# Local MongoDB with auth
MONGODB_URI="mongodb://admin:password@localhost:27017/geenius-template?authSource=admin"
```

### Prisma Configuration
Your `prisma/schema.prisma` is already configured for MongoDB:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Make sure `DATABASE_URL` in your `.env` matches `MONGODB_URI`:
```env
DATABASE_URL="mongodb://localhost:27017/geenius-template"
MONGODB_URI="mongodb://localhost:27017/geenius-template"
```

## Database Management Tools

### 1. MongoDB Compass (GUI)
- Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Connect to `mongodb://localhost:27017`
- Visual interface for managing collections

### 2. mongosh (Command Line)
```bash
# Connect to database
mongosh mongodb://localhost:27017/geenius-template

# List databases
show dbs

# Switch to your database
use geenius-template

# List collections
show collections

# View users collection
db.users.find()

# View sessions collection
db.sessions.find()
```

### 3. Prisma Studio
```bash
# Launch Prisma Studio
pnpm db:studio
```

## Database Initialization

### 1. Generate Prisma Client
```bash
pnpm db:generate
```

### 2. Push Schema to Database
```bash
pnpm db:push
```

### 3. Verify Connection
```bash
# Start your application
pnpm dev:netlify

# Try to register a user to test the connection
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongo  # macOS
   sudo systemctl status mongod     # Linux
   ```

2. **Port Already in Use**
   ```bash
   # Find what's using port 27017
   lsof -i :27017
   
   # Kill the process
   kill -9 <PID>
   ```

3. **Permission Denied**
   ```bash
   # Fix MongoDB permissions (macOS)
   sudo chown -R $(whoami) /usr/local/var/mongodb
   sudo chown -R $(whoami) /usr/local/var/log/mongodb
   ```

4. **Database Not Found**
   - MongoDB creates databases automatically when you first write data
   - No need to manually create the database

### Verification Script
Create a simple test script:

```javascript
// test-db.js
import { MongoClient } from 'mongodb';

async function testConnection() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('geenius-template');
    const result = await db.collection('test').insertOne({ test: 'data' });
    console.log('✅ Test document inserted:', result.insertedId);
    
    await db.collection('test').deleteOne({ _id: result.insertedId });
    console.log('✅ Test document deleted');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  } finally {
    await client.close();
  }
}

testConnection();
```

```bash
# Run test
node test-db.js
```

## Development Workflow

### Daily Development
```bash
# 1. Start MongoDB (if not running)
brew services start mongodb-community  # macOS
# or
docker-compose up -d  # Docker

# 2. Start your application
pnpm dev:netlify

# 3. Develop your application
# Better Auth will create collections automatically

# 4. View database (optional)
pnpm db:studio
```

### Database Reset (if needed)
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/geenius-template

# Drop database
db.dropDatabase()

# Restart your application - collections will be recreated
```

Choose the option that works best for your development environment! The MongoDB Community Server is recommended for most developers as it runs natively and provides the best performance for local development.