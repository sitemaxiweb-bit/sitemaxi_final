# Netlify Deployment Guide

## Quick Deploy

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site"

## Environment Variables

After deployment, add these environment variables in Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   PICA_SECRET_KEY=your_pica_secret_key
   PICA_OUTLOOK_MAIL_CONNECTION_KEY=your_pica_outlook_connection_key
   ```

3. Click "Save"
4. Trigger a new deployment to apply the environment variables

## Custom Domain

1. Go to **Domain settings**
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

## Important Notes

- The site uses Supabase for backend and database
- Edge Functions are hosted on Supabase (not Netlify Functions)
- All API endpoints use Supabase Edge Functions
- Contact form submissions go through Supabase Edge Functions
- Make sure all environment variables are properly configured

## Build Settings

The project is configured with:
- **Framework:** Vite + React + TypeScript
- **Build command:** `npm run build` (includes sitemap generation)
- **Output directory:** `dist`
- **Node version:** 18.x or higher (recommended)

## Continuous Deployment

Once connected to Git:
- Every push to main branch triggers automatic deployment
- Pull requests create deploy previews
- Branch deploys can be configured for staging environments

## Performance Optimizations

The netlify.toml includes:
- SPA routing redirects
- Asset caching headers (1 year for static assets)
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Proper content types for sitemap.xml and robots.txt

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify Node version compatibility
- Review build logs in Netlify dashboard

### Environment Variables Not Working
- Ensure all variables are prefixed with `VITE_` for client-side access
- Redeploy after adding/changing environment variables
- Check browser console for any errors

### 404 Errors on Routes
- Verify _redirects file exists in public folder
- Check netlify.toml redirects configuration
- Ensure SPA routing is properly configured
