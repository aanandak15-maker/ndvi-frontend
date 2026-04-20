# 🚀 NDVI.AI Quick Start Guide

## Problem: Images Not Displaying?

If you're seeing icons/emojis instead of actual satellite images, follow these steps:

### ✅ Solution

The issue is that browsers cannot display TIFF (.tif) files directly. We need to:

1. **Convert sample images to PNG format**
2. **Start the backend API server**
3. **Start the frontend development server**

---

## 🔧 Fix Steps

### Step 1: Install All Dependencies

```bash
# Python dependencies (FastAPI, PyTorch, etc.)
pip install -r requirements.txt

# Node.js dependencies (Next.js, React, etc.)
npm install
```

### Step 2: Convert Sample Images

```bash
python convert_samples.py
```

This converts the TIFF sample images to PNG format that browsers can display.

**Expected output:**
```
✅ Converted: 0B.tif -> sample1.png
✅ Converted: 1B.tif -> sample2.png
✅ Converted: 3B.tif -> sample3.png
✅ Converted: 23A.tif -> sample4.png
✅ Converted: 34A.tif -> sample5.png
```

### Step 3: Start Both Servers

**Option A: Use the startup script (easiest)**

```bash
./start_dev.sh
```

**Option B: Start manually in separate terminals**

Terminal 1 - Backend:
```bash
python api_server.py
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### Step 4: Open the App

Open your browser and go to: **http://localhost:3000**

You should now see actual satellite images instead of icons!

---

## 🎯 What Each Server Does

### Backend API (Port 8000)
- Loads the trained AI model
- Processes uploaded images
- Generates NDVI health maps
- Returns results as JSON

### Frontend (Port 3000)
- Beautiful web interface
- Sample image gallery
- Drag-and-drop upload
- Results visualization

---

## 🧪 Testing

### Test Backend API

```bash
# Check if backend is running
curl http://localhost:8000/health

# Should return:
# {"status":"healthy","model_loaded":true,"device":"mps"}
```

### Test Frontend

1. Open http://localhost:3000
2. Click any sample image
3. Wait 1-2 seconds
4. See the NDVI health map and metrics!

---

## 📊 Understanding the Results

When you analyze an image, you'll see:

1. **Original RGB Image** - Your input satellite image
2. **NDVI Health Map** - AI-generated vegetation health map
   - 🟢 Green = Healthy vegetation
   - 🟡 Yellow = Moderate health
   - 🔴 Red = Stressed vegetation

3. **Health Score** (0-100%)
   - 70-100%: Healthy
   - 50-69%: Moderate
   - 0-49%: Stressed

4. **Zone Breakdown**
   - % of healthy areas
   - % of moderate areas
   - % of stressed areas

---

## 🔍 Troubleshooting

### Images Still Not Showing?

1. **Clear browser cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Check PNG files exist**:
   ```bash
   ls public/samples/
   # Should show: sample1.png, sample2.png, etc.
   ```
3. **Restart both servers**

### "Cannot connect to AI server" Error?

1. **Check backend is running**:
   ```bash
   curl http://localhost:8000/health
   ```
2. **Check for port conflicts**:
   ```bash
   lsof -i :8000  # Should show python process
   ```
3. **Restart backend**:
   ```bash
   python api_server.py
   ```

### Model Not Found Error?

If you see "Model not found at models/generator_final.pth":

1. **Train the model first**:
   ```bash
   python train.py
   ```
   (This takes 2-4 hours on M1 Mac)

2. **Or download pre-trained weights** (if available)

### Port Already in Use?

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 📁 File Structure

```
.
├── api_server.py          # ← Backend API (FastAPI)
├── src/app/page.tsx       # ← Frontend UI (Next.js)
├── public/samples/        # ← PNG sample images
│   ├── sample1.png
│   ├── sample2.png
│   └── ...
├── models/
│   └── generator_final.pth  # ← Trained AI model
└── convert_samples.py     # ← TIFF to PNG converter
```

---

## 🎓 Next Steps

1. ✅ **Try sample images** - Click the pre-loaded samples
2. 📤 **Upload your own** - Drag and drop your satellite images
3. 📊 **Analyze results** - View health scores and zone breakdowns
4. 💾 **Download maps** - Save NDVI maps for your records

---

## 🚀 Production Deployment

See `SETUP_GUIDE.md` for detailed production deployment instructions.

---

## 💡 Tips

- **Best image formats**: PNG, JPG, or TIF
- **Optimal size**: 256x256 to 2048x2048 pixels
- **Image type**: RGB satellite or aerial imagery
- **Processing time**: Usually < 2 seconds per image

---

## 📚 Additional Resources

- Full setup guide: `SETUP_GUIDE.md`
- Model training: `train.py`
- API documentation: http://localhost:8000/docs (when backend is running)

---

**Still having issues?** Check the terminal output for error messages!
