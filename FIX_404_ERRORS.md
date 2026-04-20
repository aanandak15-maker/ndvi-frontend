# 🔧 Fix 404 Errors - Backend Not Available

## Problem Diagnosis

Your console logs show:
```
❌ Failed to load resource: the server responded with a status of 404
❌ Backend not available, displaying image only
```

**Root Cause:** Your frontend on Vercel is trying to connect to `http://localhost:8000`, which doesn't exist in production.

## Current Setup

- **Frontend**: ✅ Deployed on Vercel (https://ndvi-frontend-iota.vercel.app)
- **Backend**: ❌ Only runs locally (http://localhost:8000)
- **Connection**: ❌ Broken (frontend can't reach backend)

## Solution: Deploy Backend

### Quick Fix (15 minutes)

#### Step 1: Deploy Backend to Render

1. **Go to Render**: https://render.com
2. **Sign up** with your GitHub account
3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository: `aanandak15-maker/ndvi-frontend`
   - Render will auto-detect `render.yaml` ✅
4. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Copy your backend URL: `https://ndvi-backend-XXXX.onrender.com`

#### Step 2: Update Vercel Environment Variable

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select your project**: ndvi-frontend-iota
3. **Add Environment Variable**:
   - Settings → Environment Variables
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://ndvi-backend-XXXX.onrender.com` (your Render URL)
   - Apply to: Production, Preview, Development
4. **Redeploy**:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

#### Step 3: Test

1. Visit https://ndvi-frontend-iota.vercel.app
2. Click a sample image
3. Should load without errors! ✅

## Files Already Prepared

I've created these files for you:

1. ✅ `render.yaml` - Render deployment configuration
2. ✅ `image_server.py` - Updated with production CORS and port handling
3. ✅ `deploy_backend.sh` - Automated deployment helper
4. ✅ `BACKEND_DEPLOYMENT.md` - Detailed deployment guide

## Run Deployment Helper

```bash
./deploy_backend.sh
```

This will:
- ✅ Commit deployment files
- ✅ Push to GitHub
- ✅ Show you next steps

## Alternative: Railway

If you prefer Railway over Render:

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `aanandak15-maker/ndvi-frontend`
5. Railway auto-deploys Python apps
6. Copy generated URL
7. Add to Vercel as `NEXT_PUBLIC_API_URL`

## Cost

**Both options are FREE:**
- ✅ Render: Free tier (spins down after 15min inactivity)
- ✅ Railway: $5 free credit/month
- ✅ Vercel: Free for frontend

## What Changes Were Made

### 1. `render.yaml` (NEW)
```yaml
services:
  - type: web
    name: ndvi-backend
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python image_server.py"
```

### 2. `image_server.py` (UPDATED)
- ✅ Added production CORS (allows Vercel domain)
- ✅ Added PORT environment variable support
- ✅ Ready for cloud deployment

### 3. `deploy_backend.sh` (NEW)
- ✅ Automated deployment helper
- ✅ Commits and pushes changes
- ✅ Shows step-by-step instructions

## Testing After Deployment

### Test Backend Directly
```bash
curl https://your-backend.onrender.com/
# Should return: {"status":"online","service":"NDVI Image Server"}
```

### Test Sample Image
```bash
curl https://your-backend.onrender.com/samples/1 > test.png
open test.png
# Should display satellite image
```

### Test Frontend
1. Open https://ndvi-frontend-iota.vercel.app
2. Open browser console (F12)
3. Click sample image
4. Should see: ✅ No 404 errors
5. Should see: ✅ Image loads correctly

## Troubleshooting

### Issue: Still getting 404 errors

**Check:**
1. Backend deployed successfully on Render?
2. `NEXT_PUBLIC_API_URL` set in Vercel?
3. Frontend redeployed after adding env var?

**Solution:**
```bash
# Test backend directly
curl https://your-backend.onrender.com/

# Check Vercel env vars
# Go to Vercel → Settings → Environment Variables
# Verify NEXT_PUBLIC_API_URL is set

# Redeploy frontend
# Go to Vercel → Deployments → Redeploy
```

### Issue: CORS errors

**Symptom:** Console shows "CORS policy blocked"

**Solution:** Already fixed! `image_server.py` now includes:
```python
allow_origins=[
    "https://ndvi-frontend-iota.vercel.app",
    "https://*.vercel.app"
]
```

### Issue: Backend slow to respond

**Cause:** Render free tier spins down after 15min inactivity

**Solution:** Normal behavior. First request takes ~30 seconds (cold start), then fast.

### Issue: Images still not loading

**Check:**
1. Backend URL correct in Vercel env vars?
2. Backend actually running? (check Render dashboard)
3. TIFF files included in deployment?

## Summary

**Before:**
- Frontend: ✅ Deployed
- Backend: ❌ Local only
- Status: ❌ 404 errors

**After:**
- Frontend: ✅ Deployed on Vercel
- Backend: ✅ Deployed on Render
- Status: ✅ Working!

**Time Required:** ~15 minutes

**Cost:** $0/month (free tiers)

## Quick Start

```bash
# 1. Run deployment helper
./deploy_backend.sh

# 2. Deploy on Render (follow instructions)
# 3. Update Vercel env var
# 4. Redeploy frontend
# 5. Test!
```

## Need Help?

See detailed guides:
- `BACKEND_DEPLOYMENT.md` - Full deployment guide
- `VERCEL_DEPLOYMENT.md` - Vercel configuration
- `START_HERE.md` - Local development setup

---

**Your app will work perfectly after deploying the backend!** 🚀
