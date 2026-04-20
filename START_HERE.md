# 🎯 START HERE - Fix Images in 2 Minutes

## Your Problem

Images showing as **emojis** (🌾 🌿 🌱) instead of actual satellite images.

## The Fix (No Training Required!)

### Step 1: Install Dependencies

```bash
pip install fastapi uvicorn pillow
npm install
```

### Step 2: Start Servers

```bash
./start_simple.sh
```

### Step 3: Open Browser

Go to: **http://localhost:3000**

**Done!** Images should now display correctly. ✅

---

## What Just Happened?

A lightweight server now converts your TIFF images to PNG on-the-fly so browsers can display them.

**No training. No model. No big changes.**

---

## Manual Start (If Script Fails)

**Terminal 1:**
```bash
python image_server.py
```

**Terminal 2:**
```bash
npm run dev
```

Then open: http://localhost:3000

---

## Still Having Issues?

### Check 1: Dependencies Installed?

```bash
python -c "from PIL import Image; print('✅ OK')"
```

### Check 2: Server Running?

```bash
curl http://localhost:8000/
```

Should return: `{"status":"online",...}`

### Check 3: Sample Image Works?

Open in browser: http://localhost:8000/samples/1

Should show a satellite image.

---

## What This Does

- ✅ Converts TIFF → PNG automatically
- ✅ Displays images in browser
- ✅ No training required
- ❌ No AI analysis (just image display)

---

## Want Full AI Analysis?

See `SETUP_GUIDE.md` for training the model.

But for now, **your images work!** 🎉

---

## Files You Need

- `image_server.py` ← Conversion server
- `start_simple.sh` ← Startup script
- `src/app/page.tsx` ← Frontend (already updated)

Everything else is optional!

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./start_simple.sh` | Start everything |
| `python image_server.py` | Start server only |
| `npm run dev` | Start frontend only |
| `Ctrl+C` | Stop servers |

---

**That's it! Your images should now display correctly.** ✨

For more details, see:
- `SIMPLE_START.md` - Detailed guide
- `NO_TRAINING_SOLUTION.md` - Technical explanation
