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
   NODE_ENV=production
   ```

   **Optional (for OAuth):**
   ```
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

   **Note**: Netlify automatically sets `URL` and `DEPLOY_PRIME_URL` environment variables.

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
2. Update Authorization callback URL to: `https://test-x4.netlify.app/api/auth/callback/github`
   (Replace `test-x4` with your actual Netlify site name)

#### Google OAuth
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Update Authorized redirect URI to: `https://test-x4.netlify.app/api/auth/callback/google`
   (Replace `test-x4` with your actual Netlify site name)

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

1. **ERR_CONNECTION_REFUSED to localhost**
   - **Problem**: Auth client trying to connect to localhost in production
   - **Solution**: The fix is already implemented in auth-client.ts - redeploy your site
   - **Verify**: Check that `window.location.origin` matches your Netlify URL

2. **Build fails**
   - Check that all dependencies are in package.json
   - Verify build command is `pnpm build`
   - Check build logs for specific errors

3. **Functions timeout**
   - Ensure MongoDB connection is properly handled
   - Verify MONGODB_URI is set correctly
   - Check function logs for connection errors

4. **CORS errors**
   - Verify trusted origins in auth configuration
   - Check that Netlify sets URL environment variable
   - Ensure your frontend URL is in trusted origins

5. **OAuth not working**
   - Check callback URLs match exactly: `https://your-site.netlify.app/api/auth/callback/provider`
   - Verify OAuth client IDs and secrets are set
   - Check that OAuth providers are properly configured

6. **Database connection errors**
   - Verify MongoDB Atlas connection string
   - Check that database user has proper permissions
   - Ensure IP whitelist includes 0.0.0.0/0 for serverless functions

#### Debugging Steps:

1. **Check Function Logs**:
   ```bash
   netlify functions:log
   ```

2. **Test Auth Endpoints**:
   ```bash
   curl https://your-site.netlify.app/api/auth/session
   ```

3. **Verify Environment Variables**:
   - Go to Netlify → Site settings → Environment variables
   - Check that all required variables are set
   - Redeploy after adding new variables

4. **Check Network Tab**:
   - Open browser DevTools → Network
   - Look for failed requests to localhost
   - Verify auth requests go to your Netlify URL

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