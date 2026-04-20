# 🔗 Connect Railway Backend to Vercel Frontend

## Quick Steps (2 minutes)

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your project: **ndvi-frontend-iota**

### Step 2: Add Environment Variable
1. Click **Settings** tab
2. Click **Environment Variables** in the left sidebar
3. Click **Add New** button
4. Fill in:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://web-production-2b2e5.up.railway.app`
   - **Environments**: Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **...** (three dots) menu
4. Click **Redeploy**
5. Wait ~2 minutes for deployment to complete

### Step 4: Test
1. Visit: https://ndvi-frontend-iota.vercel.app
2. Click any sample image
3. You should see **real NDVI analysis** (different images for original and NDVI)

---

## Visual Guide

```
Vercel Dashboard
    ↓
Select Project: ndvi-frontend-iota
    ↓
Settings → Environment Variables
    ↓
Add New:
    Key: NEXT_PUBLIC_API_URL
    Value: https://web-production-2b2e5.up.railway.app
    Environments: ✅ All
    ↓
Save
    ↓
Deployments → Redeploy
    ↓
Wait 2 minutes
    ↓
✅ Backend Connected!
```

---

## What This Does

**Before:**
- Frontend tries to connect to `http://localhost:8000`
- Fails with 404 errors
- Shows same image twice (no analysis)

**After:**
- Frontend connects to `https://web-production-2b2e5.up.railway.app`
- Gets real NDVI analysis from Railway backend
- Shows different original and NDVI images
- Displays health metrics

---

## Verify It's Working

### Check Environment Variable
1. Go to Vercel → Settings → Environment Variables
2. You should see:
   ```
   NEXT_PUBLIC_API_URL = https://web-production-2b2e5.up.railway.app
   ```

### Check Deployment
1. Go to Vercel → Deployments
2. Click on latest deployment
3. Click **View Function Logs** or **Runtime Logs**
4. You should see API calls to Railway backend

### Check Frontend
1. Open https://ndvi-frontend-iota.vercel.app
2. Open browser console (F12)
3. Click a sample image
4. In Network tab, you should see:
   ```
   POST https://web-production-2b2e5.up.railway.app/analyze
   Status: 200 OK
   ```

---

## Troubleshooting

### Issue: Still showing same image twice

**Check:**
1. Did you add the environment variable?
2. Did you redeploy after adding it?
3. Did you clear browser cache?

**Solution:**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or open in incognito/private window

### Issue: Environment variable not showing

**Check:**
1. Are you in the correct project?
2. Did you click "Save"?

**Solution:**
- Go back to Settings → Environment Variables
- Add it again if missing

### Issue: CORS errors

**Check Railway backend logs:**
1. Go to Railway dashboard
2. Check if CORS is configured for Vercel domain

**Solution:**
Your Railway backend needs to allow:
```python
allow_origins=[
    "https://ndvi-frontend-iota.vercel.app",
    "https://*.vercel.app"
]
```

---

## Alternative: Use Vercel CLI

If you prefer command line:

```bash
# Link project (if not linked)
vercel link

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL production
# When prompted, enter: https://web-production-2b2e5.up.railway.app

# Redeploy
vercel --prod
```

---

## Expected Result

After following these steps, your Vercel app will:
- ✅ Connect to Railway backend
- ✅ Show real NDVI analysis
- ✅ Display different original/NDVI images
- ✅ Show health scores and metrics
- ✅ Work exactly like local version

---

**Time Required:** 2 minutes

**Cost:** $0 (both Vercel and Railway free tiers)

**Status:** Ready to connect!
