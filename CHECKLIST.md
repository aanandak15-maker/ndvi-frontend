# ✅ NDVI.AI Setup Checklist

Follow this checklist to get your application running with images displaying correctly.

## 📋 Pre-Flight Checklist

### ✅ Step 1: Verify Prerequisites

- [ ] Python 3.8+ installed: `python --version`
- [ ] Node.js 18+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Virtual environment activated (if using one)

### ✅ Step 2: Install Dependencies

```bash
# Python dependencies
pip install -r requirements.txt
```

**Verify installation:**
- [ ] FastAPI installed: `python -c "import fastapi; print('✅ FastAPI OK')"`
- [ ] PyTorch installed: `python -c "import torch; print('✅ PyTorch OK')"`
- [ ] Pillow installed: `python -c "from PIL import Image; print('✅ Pillow OK')"`

```bash
# Node.js dependencies
npm install
```

**Verify installation:**
- [ ] Next.js installed: `ls node_modules/next`
- [ ] React installed: `ls node_modules/react`

### ✅ Step 3: Convert Sample Images

```bash
python convert_samples.py
```

**Expected output:**
```
✅ Converted: 0B.tif -> sample1.png
✅ Converted: 1B.tif -> sample2.png
✅ Converted: 3B.tif -> sample3.png
✅ Converted: 23A.tif -> sample4.png
✅ Converted: 34A.tif -> sample5.png
```

**Verify:**
- [ ] PNG files created: `ls public/samples/*.png`
- [ ] 5 PNG files exist (sample1.png through sample5.png)

### ✅ Step 4: Check Model Status

```bash
ls models/generator_final.pth
```

**If model exists:**
- [ ] Model file found
- [ ] File size ~200-300 MB
- [ ] Skip to Step 6

**If model doesn't exist:**
- [ ] Need to train model (see Step 5)

### ✅ Step 5: Train Model (If Needed)

⚠️ **Only if model doesn't exist from Step 4**

```bash
python train.py
```

**This will take 2-4 hours. You can:**
- [ ] Let it run in background
- [ ] Monitor progress in terminal
- [ ] Check `training_losses.png` for progress

**After training:**
- [ ] Model saved to `models/generator_final.pth`
- [ ] Training complete message shown

### ✅ Step 6: Start Servers

**Option A: Use startup script (recommended)**

```bash
chmod +x start_dev.sh
./start_dev.sh
```

**Option B: Manual start (two terminals)**

Terminal 1:
```bash
python api_server.py
```

Terminal 2:
```bash
npm run dev
```

**Verify servers are running:**
- [ ] Backend started: See "🚀 Starting NDVI.AI API Server..."
- [ ] Frontend started: See "ready - started server on 0.0.0.0:3000"
- [ ] No error messages in either terminal

### ✅ Step 7: Test Backend

```bash
curl http://localhost:8000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "mps"
}
```

**Checklist:**
- [ ] Backend responds
- [ ] Status is "healthy"
- [ ] Model is loaded
- [ ] Device detected (mps or cpu)

### ✅ Step 8: Test Frontend

Open browser and go to: **http://localhost:3000**

**Visual checks:**
- [ ] Page loads without errors
- [ ] Header shows "NDVI.AI"
- [ ] Stats section visible (2,200 Training Images, etc.)
- [ ] "Try It Yourself" section visible
- [ ] **5 sample images visible (NOT emojis)**
- [ ] Upload area visible

### ✅ Step 9: Test Image Analysis

**Test with sample image:**
1. [ ] Click any sample image
2. [ ] Loading spinner appears
3. [ ] Wait 1-2 seconds
4. [ ] Results section appears
5. [ ] Original RGB image shown
6. [ ] NDVI health map shown
7. [ ] Health score displayed (0-100%)
8. [ ] Status shown (Healthy/Moderate/Stressed)
9. [ ] Zone breakdown visible

**Test with upload:**
1. [ ] Drag and drop an image OR click upload area
2. [ ] Image uploads successfully
3. [ ] Analysis completes
4. [ ] Results displayed

### ✅ Step 10: Verify Everything Works

**Final checks:**
- [ ] Sample images display correctly (not emojis)
- [ ] Backend API responds to requests
- [ ] Image analysis works
- [ ] NDVI maps generate correctly
- [ ] Health metrics calculate properly
- [ ] No errors in browser console (F12)
- [ ] No errors in terminal output

## 🎉 Success Criteria

If all items above are checked, your NDVI.AI application is **fully functional**!

You should see:
- ✅ Real satellite images (not 🌾 🌿 🌱 emojis)
- ✅ Working backend API
- ✅ NDVI generation in < 2 seconds
- ✅ Health metrics and scores
- ✅ Professional UI

## 🔧 Troubleshooting Checklist

### If Images Still Show Emojis

- [ ] PNG files exist: `ls public/samples/*.png`
- [ ] Browser cache cleared: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- [ ] Frontend restarted
- [ ] Check browser console for errors (F12)

### If Backend Fails

- [ ] Python 3.8+ installed
- [ ] All dependencies installed: `pip list | grep fastapi`
- [ ] Model exists: `ls models/generator_final.pth`
- [ ] Port 8000 not in use: `lsof -i :8000`
- [ ] Check terminal for error messages

### If Frontend Fails

- [ ] Node.js 18+ installed
- [ ] Dependencies installed: `ls node_modules/next`
- [ ] Port 3000 not in use: `lsof -i :3000`
- [ ] Check browser console for errors

### If Analysis Fails

- [ ] Backend is running
- [ ] Model is loaded (check `/health` endpoint)
- [ ] Image format is supported (PNG, JPG, TIF)
- [ ] Image size is reasonable (< 10 MB)
- [ ] Check backend terminal for errors

## 📚 Quick Reference

### Start Servers
```bash
./start_dev.sh
```

### Stop Servers
Press `Ctrl+C` in terminal

### Check Backend Health
```bash
curl http://localhost:8000/health
```

### View API Docs
http://localhost:8000/docs

### Convert Images Again
```bash
python convert_samples.py
```

### Train Model
```bash
python train.py
```

## 📖 Documentation

- **Quick Start**: `QUICK_START.md`
- **Full Setup**: `SETUP_GUIDE.md`
- **Fixes Applied**: `FIXES_APPLIED.md`
- **Solution Summary**: `SOLUTION_SUMMARY.md`

## 🎯 Common Issues

### Issue: "Cannot connect to AI server"
**Solution:** Start backend with `python api_server.py`

### Issue: "Model not found"
**Solution:** Train model with `python train.py`

### Issue: Images show emojis
**Solution:** Run `python convert_samples.py` and clear browser cache

### Issue: Port already in use
**Solution:** Kill process: `lsof -ti:8000 | xargs kill -9`

## ✨ You're All Set!

Once all checkboxes are marked, your NDVI.AI application is ready to:
- Analyze satellite imagery
- Generate NDVI health maps
- Provide crop health insights
- Process images in real-time

**Happy analyzing! 🌱**
