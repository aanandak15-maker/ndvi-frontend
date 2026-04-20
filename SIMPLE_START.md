# 🚀 Simple Start - No Training Required!

This is the **simplest way** to get your images displaying without any model training or big changes.

## What This Does

- ✅ Converts TIFF images to PNG **on-the-fly** (no pre-conversion needed)
- ✅ Serves images via a lightweight API server
- ✅ Displays images in your web interface
- ❌ No AI model required
- ❌ No training needed
- ❌ No NDVI generation (just displays images)

## 🎯 Quick Start (2 Steps)

### Step 1: Install Dependencies (if not done)

```bash
pip install fastapi uvicorn pillow
npm install
```

### Step 2: Start Everything

```bash
./start_simple.sh
```

That's it! Open http://localhost:3000 and you'll see your images.

## 📸 How It Works

```
TIFF File → Image Server → Converts to PNG → Browser Displays
```

The `image_server.py` automatically:
1. Reads TIFF files from your root directory
2. Converts them to PNG in memory
3. Serves them to the browser
4. No files are saved - all done on-the-fly!

## 🌐 Available Endpoints

Once the server is running:

- **Sample 1**: http://localhost:8000/samples/1 (0B.tif)
- **Sample 2**: http://localhost:8000/samples/2 (1B.tif)
- **Sample 3**: http://localhost:8000/samples/3 (3B.tif)
- **Sample 4**: http://localhost:8000/samples/4 (23A.tif)
- **Sample 5**: http://localhost:8000/samples/5 (34A.tif)

You can also access any TIFF file:
- http://localhost:8000/image/9A.tif
- http://localhost:8000/image/34A.tif

## 🎨 What You'll See

1. Open http://localhost:3000
2. See 5 sample satellite images (converted from TIFF)
3. Click them to view full size
4. Upload your own TIFF/PNG/JPG images

## ⚠️ Limitations

This simple mode:
- ✅ Shows images correctly
- ✅ Converts TIFF to PNG automatically
- ✅ No training required
- ❌ Does NOT generate NDVI maps (no AI)
- ❌ Does NOT analyze crop health
- ❌ Does NOT provide health scores

**This is perfect if you just want to fix the image display issue!**

## 🚀 Want AI Analysis?

If you want the full AI-powered NDVI generation:

1. Train the model: `python train.py` (takes 2-4 hours)
2. Use the full server: `python api_server.py`

But for now, this simple mode gets your images displaying immediately!

## 🔧 Manual Start (Alternative)

If the script doesn't work, start manually:

**Terminal 1 - Image Server:**
```bash
python image_server.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📁 Files Used

- `image_server.py` - Lightweight TIFF to PNG converter
- `src/app/page.tsx` - Frontend (updated to use API)
- `start_simple.sh` - One-command startup

## 🎯 Summary

**Before:** Images showed as emojis because browsers can't display TIFF

**After:** Image server converts TIFF → PNG on-the-fly, browsers display them

**No training. No model. No big changes. Just works!** ✨

---

## 💡 Next Steps

Once images are displaying:
1. ✅ Verify all 5 samples show correctly
2. ✅ Try uploading your own images
3. ✅ Browse through your dataset

When you're ready for AI analysis:
- See `SETUP_GUIDE.md` for full setup
- Train model with `python train.py`
- Use `api_server.py` instead of `image_server.py`
