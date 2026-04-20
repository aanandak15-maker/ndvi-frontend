# ⚡ QUICK FIX - Connect Backend (2 Minutes)

## The Problem
Your Vercel frontend can't see the Railway backend because the environment variable is missing.

## The Solution (3 Steps)

### 1️⃣ Open Vercel Settings
```
https://vercel.com/dashboard
→ Click "ndvi-frontend-iota"
→ Click "Settings" tab
→ Click "Environment Variables"
```

### 2️⃣ Add This Variable
```
Key:   NEXT_PUBLIC_API_URL
Value: https://web-production-2b2e5.up.railway.app

✅ Check: Production
✅ Check: Preview  
✅ Check: Development

Click "Save"
```

### 3️⃣ Redeploy
```
→ Click "Deployments" tab
→ Click "..." on latest deployment
→ Click "Redeploy"
→ Wait 2 minutes
```

## ✅ Done!

Visit: https://ndvi-frontend-iota.vercel.app

Click any sample image → You'll see real NDVI analysis!

---

## Why This Works

**Without environment variable:**
```
Frontend → tries localhost:8000 → ❌ 404 error
```

**With environment variable:**
```
Frontend → Railway backend → ✅ Real NDVI analysis
```

---

## Need Help?

See detailed guide: `CONNECT_RAILWAY_BACKEND.md`
