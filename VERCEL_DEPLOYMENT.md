# 🚀 Vercel Deployment Guide

## Current Status

✅ **Frontend deployed on Vercel:** https://ndvi-frontend-iota.vercel.app

The frontend now works standalone without requiring a backend server!

---

## How It Works

### Demo Mode (Vercel)

When deployed on Vercel without a backend:

1. **Sample Images**: Display directly from the image server URLs
2. **Uploaded Images**: Display in "Frontend Only" mode
3. **No AI Analysis**: Shows "Display Only" message
4. **Clear Instructions**: Tells users to run locally for AI features

### Full Mode (Local)

When running locally with backend:

1. **Sample Images**: Converted from TIFF to PNG on-the-fly
2. **Uploaded Images**: Processed by backend
3. **AI Analysis**: Full NDVI generation (when model is trained)
4. **Health Metrics**: Complete crop health analysis

---

## Frontend Changes for Vercel

### 1. Graceful Backend Fallback

```typescript
// Try backend first
try {
  const res = await fetch(`${apiUrl}/analyze`, { ... });
  // Use backend response
} catch (apiError) {
  // Backend not available - just display image
  setResult({
    success: true,
    original_image: base64Data,
    ndvi_image: base64Data,
    health: {
      status: "Display Only",
      message: "Backend not available. Run locally for AI analysis."
    }
  });
}
```

### 2. Demo Mode Banner

```tsx
<div className="bg-blue-500/10 border border-blue-500/20">
  <p>ℹ️ Demo Mode: For full AI analysis, run ./start_simple.sh locally</p>
  <a href="https://github.com/...">View on GitHub →</a>
</div>
```

### 3. Status Indicator

```tsx
// Header shows current mode
<span>Demo Mode - Run locally for AI</span>
```

---

## Deployment Options

### Option 1: Frontend Only (Current - Vercel)

**Pros:**
- ✅ Free hosting on Vercel
- ✅ Fast global CDN
- ✅ Automatic deployments from GitHub
- ✅ Works as a demo/preview

**Cons:**
- ❌ No AI analysis
- ❌ No TIFF conversion
- ❌ Display only mode

**Best for:** Demo, portfolio, preview

### Option 2: Full Stack (Local)

**Pros:**
- ✅ Full AI-powered NDVI generation
- ✅ TIFF to PNG conversion
- ✅ Health metrics and analysis
- ✅ Upload and analyze any image

**Cons:**
- ❌ Requires local setup
- ❌ Need to train model (2-4 hours)
- ❌ Not publicly accessible

**Best for:** Actual use, development, testing

### Option 3: Full Stack (Cloud - Advanced)

**Requirements:**
- Backend hosting (Railway, Render, AWS, etc.)
- Model file storage
- Environment variables setup

**Steps:**
1. Deploy backend to cloud service
2. Upload trained model
3. Set `NEXT_PUBLIC_API_URL` in Vercel
4. Redeploy frontend

**Best for:** Production use, public access

---

## Current Vercel Setup

### Environment Variables

None required for demo mode!

For full stack (if backend deployed):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Build Settings

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Deployment

Automatic from GitHub:
- Push to `main` branch
- Vercel auto-deploys
- Live in ~2 minutes

---

## User Experience

### On Vercel (Demo Mode)

1. User visits https://ndvi-frontend-iota.vercel.app
2. Sees "Demo Mode" banner
3. Can view sample images
4. Can upload images (display only)
5. Gets instructions to run locally for AI

### Running Locally (Full Mode)

1. Clone repo: `git clone https://github.com/aanandak15-maker/ndvi-frontend.git`
2. Install: `pip install -r requirements.txt && npm install`
3. Start: `./start_simple.sh`
4. Open: http://localhost:3000
5. Full AI analysis available!

---

## Error Handling

### Before Fix

```
ERROR: API error: 404
Cannot connect to server
```

### After Fix

```
✅ Image displayed successfully
ℹ️ Backend not available. Run locally for AI analysis.
```

---

## Testing

### Test 1: Vercel Deployment

1. Visit https://ndvi-frontend-iota.vercel.app
2. Check for "Demo Mode" banner ✅
3. Click sample image ✅
4. Verify image displays ✅
5. Check for "Display Only" message ✅

### Test 2: Local Full Stack

1. Run `./start_simple.sh`
2. Open http://localhost:3000
3. Upload TIFF file ✅
4. Verify conversion works ✅
5. Check backend response ✅

---

## Future Enhancements

### Option A: Deploy Backend

1. **Choose hosting:**
   - Railway (easiest)
   - Render (free tier)
   - AWS/GCP (scalable)

2. **Deploy backend:**
   ```bash
   # On hosting platform
   pip install -r requirements.txt
   python image_server.py
   ```

3. **Update Vercel:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

### Option B: Serverless Functions

Convert backend to Vercel serverless functions:
- Create `api/` directory
- Add serverless functions
- Deploy together with frontend

### Option C: Edge Functions

Use Vercel Edge Functions for image processing:
- Faster than serverless
- Global distribution
- Limited compute time

---

## Monitoring

### Vercel Analytics

- Page views
- Performance metrics
- Error tracking
- User geography

### Backend Monitoring (if deployed)

- API response times
- Error rates
- Upload success rate
- Model inference time

---

## Cost Breakdown

### Current Setup (Free)

- Vercel hosting: **$0/month**
- GitHub repo: **$0/month**
- Total: **$0/month**

### With Backend (Estimated)

- Vercel frontend: **$0/month**
- Railway backend: **$5-20/month**
- Storage: **$1-5/month**
- Total: **$6-25/month**

---

## Summary

**Current Status:**
- ✅ Frontend deployed on Vercel
- ✅ Works without backend
- ✅ Demo mode functional
- ✅ No 404 errors
- ✅ Clear user instructions

**To Get Full AI Features:**
```bash
git clone https://github.com/aanandak15-maker/ndvi-frontend.git
cd ndvi-frontend
pip install -r requirements.txt
npm install
./start_simple.sh
```

**Live Demo:** https://ndvi-frontend-iota.vercel.app

---

## Troubleshooting

### Issue: Images not loading on Vercel

**Solution:** Check browser console, ensure image URLs are correct

### Issue: Upload not working

**Expected:** Upload shows "Display Only" mode on Vercel (this is correct)

### Issue: Want AI analysis on Vercel

**Solution:** Deploy backend separately and set `NEXT_PUBLIC_API_URL`

---

**Deployment complete and working!** ✅
