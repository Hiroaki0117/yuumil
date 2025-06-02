# Vercel Deployment Checklist for Yuumil

## 🔐 Environment Variables
Ensure all these variables are configured in Vercel project settings:

### Database
- [ ] `DATABASE_URL` - PostgreSQL connection string (pooled)
- [ ] `DIRECT_URL` - Direct PostgreSQL connection (non-pooled)

### Authentication (Clerk)
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/dashboard`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/onboarding`

### Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`

### Application
- [ ] `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., https://yuumil.com)
- [ ] `YOUTUBE_API_KEY` - For fetching video data

## 📦 Build Configuration
- [ ] Node.js version: 18.17 or later
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)
- [ ] Install command: `npm install` (default)

## 🗄️ Database Setup
1. [ ] Ensure Supabase database is configured
2. [ ] Run database migrations if needed
3. [ ] Verify `videos` and `user_preferences` tables exist
4. [ ] Test database connection with pooled URL

## ✅ Pre-deployment Tests
Run these commands locally:
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Check TypeScript
npx tsc --noEmit

# Build for production
npm run build

# Test production build locally
npm run start
```

## 🚀 Deployment Steps
1. [ ] Push code to GitHub repository
2. [ ] Connect GitHub repo to Vercel
3. [ ] Configure all environment variables
4. [ ] Deploy to preview environment first
5. [ ] Test all critical paths:
   - [ ] Landing page loads
   - [ ] Authentication works
   - [ ] Onboarding flow completes
   - [ ] Dashboard displays videos
   - [ ] Search/filter functionality
   - [ ] Mobile navigation menu
6. [ ] Deploy to production

## 🔍 Post-deployment Verification
- [ ] Check browser console for errors
- [ ] Verify all API endpoints return data
- [ ] Test theme switching (light/dark)
- [ ] Verify mobile responsiveness
- [ ] Check page load performance
- [ ] Monitor error logs in Vercel dashboard

## 📊 Performance Monitoring
- [ ] Set up Vercel Analytics
- [ ] Configure Web Vitals monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor API response times

## 🔧 Optimization Tips
1. Enable Vercel Edge Config for dynamic configuration
2. Use Vercel KV for session storage if needed
3. Configure custom domains properly
4. Set up proper redirects for www/non-www

## ⚠️ Common Issues
- **Build fails**: Check environment variables and TypeScript errors
- **Database errors**: Verify connection strings and Prisma schema
- **Auth issues**: Ensure Clerk URLs match production domain
- **Slow performance**: Check image optimization and API caching

## 📝 Notes
- The application uses Edge Runtime for some API routes
- Image optimization is configured for YouTube thumbnails
- Caching headers are implemented on API routes
- Mobile navigation has been added for better UX