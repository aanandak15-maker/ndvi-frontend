# 🚀 Backend Deployment Guide

## Problem

Your Vercel frontend shows "Backend not available" because:
- Frontend: https://ndvi-frontend-iota.vercel.app (✅ deployed)
- Backend: http://localhost:8000 (❌ only works locally)

## Solution: Deploy Backend to Render

### Option 1: Render (Recommended - Free Tier)

#### Step 1: Prepare Backend for Deployment

Create `render.yaml`:
```yaml
services:
  - type: web
    name: ndvi-backend
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python image_server.py"
    envVars:
      - key: PORT
        value: 8000
```

#### Step 2: Update `image_server.py` for Production

Add at the bottom:
```python
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
```

#### Step 3: Deploy to Render

1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo: `aanandak15-maker/ndvi-frontend`
5. Configure:
   - **Name**: ndvi-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python image_server.py`
6. Click "Create Web Service"

#### Step 4: Update Vercel Environment Variable

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://ndvi-backend.onrender.com` (your Render URL)
5. Redeploy frontend

### Option 2: Railway (Also Free Tier)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `aanandak15-maker/ndvi-frontend`
5. Add environment variable:
   - `PORT=8000`
6. Railway will auto-detect Python and deploy
7. Copy the generated URL
8. Add to Vercel as `NEXT_PUBLIC_API_URL`

### Option 3: Vercel Serverless Functions (Advanced)

Convert your backend to Vercel serverless functions:

Create `api/samples/[id].ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const sampleId = params.id;
  const tiffPath = path.join(process.cwd(), `${sampleId}.tif`);
  
  if (!fs.existsSync(tiffPath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  
  const buffer = fs.readFileSync(tiffPath);
  const pngBuffer = await sharp(buffer).png().toBuffer();
  
  return new NextResponse(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
```

## Quick Start (Render)

### 1. Create `render.yaml`
```bash
cat > render.yaml << 'EOF'
services:
  - type: web
    name: ndvi-backend
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python image_server.py"
    envVars:
      - key: PORT
        value: 8000
EOF
```

### 2. Update CORS in `image_server.py`

Change:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

To:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://ndvi-frontend-iota.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Commit and Push
```bash
git add render.yaml image_server.py
git commit -m "Add Render deployment config"
git push origin main
```

### 4. Deploy on Render
- Go to https://render.com
- Connect GitHub repo
- Deploy!

### 5. Update Vercel
- Add `NEXT_PUBLIC_API_URL` environment variable
- Redeploy

## Cost Comparison

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| **Render** | ✅ Yes | Spins down after 15min inactivity |
| **Railway** | ✅ Yes | $5 credit/month |
| **Vercel Functions** | ✅ Yes | 100GB-hours/month |
| **Heroku** | ❌ No | Paid only |

## Recommended: Render

**Pros:**
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Auto-deploys on push
- ✅ Built-in SSL
- ✅ Good for Python apps

**Cons:**
- ⚠️ Spins down after 15min (first request slow)
- ⚠️ Limited to 750 hours/month

## Testing After Deployment

1. Test backend directly:
```bash
curl https://your-backend.onrender.com/
```

2. Test sample image:
```bash
curl https://your-backend.onrender.com/samples/1 > test.png
open test.png
```

3. Test frontend:
- Visit https://ndvi-frontend-iota.vercel.app
- Click a sample image
- Should load without "Backend not available" message

## Troubleshooting

### Issue: CORS errors
**Solution**: Add Vercel domain to `allow_origins` in `image_server.py`

### Issue: 404 on samples
**Solution**: Ensure TIFF files are included in deployment

### Issue: Slow first load
**Solution**: Normal for Render free tier (cold start)

### Issue: Backend won't start
**Solution**: Check Render logs for errors

## Summary

**Current State:**
- Frontend: ✅ Deployed on Vercel
- Backend: ❌ Only runs locally

**After Deployment:**
- Frontend: ✅ Deployed on Vercel
- Backend: ✅ Deployed on Render
- Connection: ✅ Working via `NEXT_PUBLIC_API_URL`

**Total Cost:** $0/month (using free tiers)

**Setup Time:** ~15 minutes
