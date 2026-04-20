# 🚀 Complete Deployment Guide - Fix 404 Errors

## 🎯 What This Fixes

Your console shows:
```
❌ Failed to load resource: 404
❌ Backend not available, displaying image only
```

**This guide will fix it in 15 minutes!**

---

## 📋 Quick Start (TL;DR)

```bash
# 1. Run deployment script
./deploy_backend.sh

# 2. Deploy on Render
# Go to https://render.com → New Web Service → Select your repo

# 3. Update Vercel
# Add NEXT_PUBLIC_API_URL environment variable

# 4. Done! ✅
```

---

## 🔍 Understanding the Problem

### Current Architecture (Broken)

```
User Browser
    ↓
Vercel Frontend (https://ndvi-frontend-iota.vercel.app)
    ↓ tries to connect to...
    ↓
localhost:8000 ❌ (doesn't exist in production!)
```

### Fixed Architecture

```
User Browser
    ↓
Vercel Frontend (https://ndvi-frontend-iota.vercel.app)
    ↓ connects to...
    ↓
Render Backend (https://ndvi-backend.onrender.com) ✅
```

---

## 📦 What I've Prepared for You

All files are ready to deploy:

### 1. `render.yaml` ✅
Tells Render how to deploy your backend:
```yaml
services:
  - type: web
    name: ndvi-backend
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python image_server.py"
```

### 2. `image_server.py` ✅
Updated with:
- ✅ Production CORS (allows Vercel domain)
- ✅ Dynamic PORT (works on any cloud platform)
- ✅ Environment variable support

### 3. `.gitignore` ✅
Updated to include sample TIFF files:
- ✅ Excludes large data folders
- ✅ Includes 6 sample images for deployment

### 4. `deploy_backend.sh` ✅
Automated deployment helper:
- ✅ Checks git status
- ✅ Adds sample TIFF files
- ✅ Commits changes
- ✅ Pushes to GitHub
- ✅ Shows next steps

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Files (1 minute)

```bash
# Make script executable (if not already)
chmod +x deploy_backend.sh

# Run deployment helper
./deploy_backend.sh
```

**What it does:**
- ✅ Checks git repository
- ✅ Ensures sample TIFF files are included
- ✅ Commits deployment configuration
- ✅ Pushes to GitHub
- ✅ Shows next steps

### Step 2: Deploy Backend on Render (5 minutes)

1. **Go to Render**: https://render.com

2. **Sign Up/Login**:
   - Click "Get Started"
   - Choose "Sign up with GitHub"
   - Authorize Render

3. **Create Web Service**:
   - Click "New +" button (top right)
   - Select "Web Service"
   - Click "Connect account" if needed
   - Find repository: `aanandak15-maker/ndvi-frontend`
   - Click "Connect"

4. **Configure Service**:
   - **Name**: `ndvi-backend` (or any name you like)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python image_server.py`
   - **Plan**: Free

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Watch the logs for "Deploy succeeded" ✅

6. **Copy Backend URL**:
   - Look for URL at top: `https://ndvi-backend-XXXX.onrender.com`
   - Copy this URL (you'll need it next)

### Step 3: Update Vercel Frontend (3 minutes)

1. **Go to Vercel**: https://vercel.com/dashboard

2. **Select Your Project**:
   - Find `ndvi-frontend-iota`
   - Click on it

3. **Add Environment Variable**:
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar
   - Click "Add New"
   - Fill in:
     - **Key**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://ndvi-backend-XXXX.onrender.com` (your Render URL)
     - **Environments**: Check all (Production, Preview, Development)
   - Click "Save"

4. **Redeploy Frontend**:
   - Click "Deployments" tab
   - Find latest deployment
   - Click "..." menu (three dots)
   - Click "Redeploy"
   - Wait ~2 minutes

### Step 4: Test Your App (1 minute)

1. **Open Your App**:
   ```
   https://ndvi-frontend-iota.vercel.app
   ```

2. **Open Browser Console**:
   - Press F12 (or Cmd+Option+I on Mac)
   - Go to "Console" tab

3. **Click a Sample Image**:
   - Click any of the sample images
   - Watch the console

4. **Verify Success**:
   - ✅ No 404 errors
   - ✅ Image loads correctly
   - ✅ No "Backend not available" message

---

## ✅ Success Checklist

- [ ] Ran `./deploy_backend.sh`
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] `NEXT_PUBLIC_API_URL` added to Vercel
- [ ] Frontend redeployed
- [ ] Tested app - no 404 errors
- [ ] Images load correctly

---

## 🧪 Testing Commands

### Test Backend Health
```bash
# Replace with your actual Render URL
curl https://ndvi-backend-XXXX.onrender.com/

# Expected response:
# {
#   "status": "online",
#   "service": "NDVI Image Server",
#   "description": "Converts TIFF images to PNG on-the-fly"
# }
```

### Test Sample Image
```bash
# Download sample image
curl https://ndvi-backend-XXXX.onrender.com/samples/1 -o test.png

# Open it
open test.png  # Mac
# or
xdg-open test.png  # Linux
```

### Test Frontend
1. Open https://ndvi-frontend-iota.vercel.app
2. Open browser console (F12)
3. Click sample image
4. Check console for errors

**Expected:**
- ✅ No 404 errors
- ✅ Image loads
- ✅ No CORS errors

---

## 🐛 Troubleshooting

### Issue 1: Still Getting 404 Errors

**Symptoms:**
```
Failed to load resource: 404
Backend not available
```

**Possible Causes:**
1. Backend not deployed yet
2. Environment variable not set
3. Frontend not redeployed

**Solutions:**

**Check Backend:**
```bash
curl https://your-backend.onrender.com/
```
If this fails, backend isn't deployed correctly.

**Check Vercel Env Var:**
1. Go to Vercel → Settings → Environment Variables
2. Verify `NEXT_PUBLIC_API_URL` exists
3. Verify URL is correct (no trailing slash)

**Redeploy Frontend:**
1. Go to Vercel → Deployments
2. Click "..." → "Redeploy"
3. Wait for deployment to complete

### Issue 2: CORS Errors

**Symptoms:**
```
Access to fetch blocked by CORS policy
```

**Solution:**
Already fixed! `image_server.py` includes:
```python
allow_origins=[
    "https://ndvi-frontend-iota.vercel.app",
    "https://*.vercel.app"
]
```

If still having issues:
1. Check Render logs for CORS errors
2. Verify Vercel domain matches
3. Redeploy backend

### Issue 3: Images Not Loading

**Symptoms:**
- Backend responds
- No 404 errors
- But images don't display

**Possible Causes:**
1. TIFF files not included in deployment
2. File paths incorrect

**Solutions:**

**Check TIFF Files:**
```bash
# In your local repo
git ls-files "*.tif"

# Should show:
# 0B.tif
# 1B.tif
# 3B.tif
# 23A.tif
# 34A.tif
# 9A.tif
```

If empty, run:
```bash
git add -f *.tif
git commit -m "Add sample TIFF files"
git push origin main
```

Then redeploy on Render.

### Issue 4: Slow First Load

**Symptoms:**
- First request takes 30+ seconds
- Subsequent requests fast

**Cause:**
Render free tier "spins down" after 15 minutes of inactivity.

**Solution:**
This is normal behavior for free tier. Options:
1. Accept it (free)
2. Upgrade to paid tier ($7/month - always on)
3. Use Railway instead (also has free tier)

### Issue 5: Backend Deployment Failed

**Symptoms:**
Render shows "Deploy failed" or errors in logs

**Common Causes:**

**Missing Dependencies:**
```bash
# Check requirements.txt includes:
fastapi
uvicorn
pillow
```

**Python Version:**
Render uses Python 3.7+ by default. If issues, specify version:
```yaml
# In render.yaml, add:
services:
  - type: web
    runtime: python-3.11
```

**Port Issues:**
Ensure `image_server.py` uses environment PORT:
```python
port = int(os.environ.get("PORT", 8000))
```

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| **Vercel** | Hobby | $0/month | 100GB bandwidth, unlimited sites |
| **Render** | Free | $0/month | 750 hours/month, spins down after 15min |
| **GitHub** | Free | $0/month | Unlimited public repos |
| **Total** | | **$0/month** | |

### Upgrade Options (Optional)

**Render Starter ($7/month):**
- ✅ Always on (no spin down)
- ✅ Faster performance
- ✅ More resources

**Vercel Pro ($20/month):**
- ✅ More bandwidth
- ✅ Analytics
- ✅ Team features

---

## 🎯 Alternative Deployment Options

### Option 1: Railway (Instead of Render)

**Pros:**
- ✅ $5 free credit/month
- ✅ Easier setup
- ✅ Better free tier

**Steps:**
1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub"
4. Select your repo
5. Railway auto-deploys
6. Copy URL
7. Add to Vercel as `NEXT_PUBLIC_API_URL`

### Option 2: Vercel Serverless Functions

**Pros:**
- ✅ Everything in one place
- ✅ No separate backend
- ✅ Better integration

**Cons:**
- ❌ More complex setup
- ❌ Need to refactor code

**Not recommended for now** - stick with Render/Railway.

### Option 3: Self-Hosted

**Pros:**
- ✅ Full control
- ✅ No limits

**Cons:**
- ❌ Need your own server
- ❌ More maintenance
- ❌ Costs more

---

## 📊 Performance Expectations

### Render Free Tier

**Cold Start (first request after 15min):**
- Time: 20-40 seconds
- Reason: Server needs to spin up

**Warm Requests:**
- Time: 100-500ms
- Reason: Server already running

**Image Conversion:**
- Time: 50-200ms per image
- Depends on image size

### After Upgrade to Paid

**All Requests:**
- Time: 100-500ms
- No cold starts

---

## 🔐 Security Notes

### Environment Variables

**Never commit:**
- ❌ API keys
- ❌ Secrets
- ❌ Passwords

**Always use:**
- ✅ Environment variables
- ✅ Vercel/Render secrets
- ✅ `.env.local` (gitignored)

### CORS Configuration

Current setup allows:
- ✅ Your Vercel domain
- ✅ All Vercel preview deployments
- ✅ Localhost (for development)

This is secure for your use case.

---

## 📚 Additional Resources

### Documentation
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **FastAPI**: https://fastapi.tiangolo.com

### Your Project Docs
- `FIX_404_ERRORS.md` - Quick troubleshooting
- `BACKEND_DEPLOYMENT.md` - Detailed deployment guide
- `DEPLOYMENT_STATUS.md` - Current status overview
- `VERCEL_DEPLOYMENT.md` - Vercel-specific info

### Support
- **Render Community**: https://community.render.com
- **Vercel Discord**: https://vercel.com/discord
- **GitHub Issues**: Create issue in your repo

---

## 🎉 Success!

After following this guide, you should have:

- ✅ Backend deployed on Render
- ✅ Frontend connected to backend
- ✅ No 404 errors
- ✅ Images loading correctly
- ✅ Fully working app
- ✅ $0/month cost

**Your app is now live and working!** 🚀

---

## 🔄 Future Updates

### Deploying Code Changes

**Backend Changes:**
```bash
# Make changes to image_server.py
git add image_server.py
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

**Frontend Changes:**
```bash
# Make changes to src/app/page.tsx
git add src/
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys
```

### Adding New Features

1. Develop locally
2. Test with `./start_simple.sh`
3. Commit and push
4. Auto-deploys to production

---

## 📞 Need Help?

If you're stuck:

1. **Check Logs:**
   - Render: Dashboard → Logs
   - Vercel: Deployments → View Logs

2. **Test Components:**
   - Backend: `curl https://your-backend.onrender.com/`
   - Frontend: Browser console (F12)

3. **Review Guides:**
   - `FIX_404_ERRORS.md`
   - `BACKEND_DEPLOYMENT.md`

4. **Common Issues:**
   - See Troubleshooting section above

---

**Ready to deploy? Run `./deploy_backend.sh` now!** 🚀
