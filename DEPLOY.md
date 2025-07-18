# Deployment Guide

## Netlify Deployment

### 1. Prerequisites
- MongoDB Atlas account (for production database)
- GitHub repository with your code
- Netlify account

### 2. MongoDB Atlas Setup
1. Create a new cluster in MongoDB Atlas
2. Create a database user with read/write permissions
3. Get your connection string (replace `<password>` with your actual password)
4. Whitelist your IP or use `0.0.0.0/0` for development

### 3. Netlify Deployment

#### Option A: Deploy from GitHub (Recommended)
1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

3. **Environment Variables**
   Add these in Netlify → Site settings → Environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   BETTER_AUTH_SECRET=your-long-random-secret-key
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

#### Option B: Deploy via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 4. OAuth Configuration

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Update Authorization callback URL to: `https://your-site.netlify.app/api/auth/callback/github`

#### Google OAuth
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Update Authorized redirect URI to: `https://your-site.netlify.app/api/auth/callback/google`

### 5. Custom Domain (Optional)
1. In Netlify → Site settings → Domain management
2. Add your custom domain
3. Update OAuth callback URLs to use your custom domain

### 6. Environment Variables Reference

**Required:**
```
MONGODB_URI=mongodb+srv://...
BETTER_AUTH_SECRET=your-secret-key
```

**Optional (for OAuth):**
```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 7. Troubleshooting

#### Common Issues:
1. **Build fails**: Check that all dependencies are in package.json
2. **Functions timeout**: Ensure MongoDB connection is properly handled
3. **CORS errors**: Verify trusted origins in auth configuration
4. **OAuth not working**: Check callback URLs match exactly

#### Function logs:
```bash
netlify functions:log
```

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
vercel --prod
```

### 3. Environment Variables
Add the same environment variables as Netlify in your Vercel dashboard.

## Railway Deployment

### 1. Connect Repository
1. Go to Railway.app
2. Connect your GitHub repository
3. Set up environment variables

### 2. Configure Build
Railway should auto-detect the build configuration from package.json.

## Post-Deployment Checklist

- [ ] Database connection working
- [ ] Authentication endpoints responding
- [ ] OAuth providers configured
- [ ] SSL certificate installed
- [ ] Custom domain (if applicable)
- [ ] Environment variables set
- [ ] Functions deployed successfully
- [ ] All routes working correctly

## Performance Optimization

1. **Enable caching** for static assets
2. **Compress images** before deployment
3. **Use CDN** for better global performance
4. **Monitor function execution** times
5. **Optimize bundle size** with code splitting

## Security Considerations

1. **Never commit secrets** to version control
2. **Use strong random secrets** for BETTER_AUTH_SECRET
3. **Restrict OAuth domains** in production
4. **Monitor function logs** for suspicious activity
5. **Use HTTPS only** in production

## Monitoring

### Netlify Analytics
- Enable Netlify Analytics for traffic insights
- Monitor function invocations and errors
- Set up alerts for downtime

### Database Monitoring
- Monitor MongoDB Atlas metrics
- Set up alerts for connection issues
- Monitor query performance

Congratulations! Your Geenius Template is now deployed with serverless authentication! 🚀