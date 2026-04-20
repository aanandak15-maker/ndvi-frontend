# 🚀 Complete Setup Guide for M1 Mac

## Step 1: Install Dependencies

You're already in your virtual environment, so just run:

```bash
pip install torch torchvision numpy Pillow matplotlib tqdm opencv-python streamlit
```

**Why these packages?**
- `torch` & `torchvision`: PyTorch with M1 MPS support
- `numpy`: Array operations
- `Pillow`: Image loading/saving
- `matplotlib`: Plotting training progress
- `tqdm`: Progress bars
- `opencv-python`: Additional image processing
- `streamlit`: Web interface for testing

---

## Step 2: Prepare Your Data

Your data is already organized! The script will use:
- **RGB images**: `Main Folder/RGB/` (2200 images)
- **NDVI images**: `Main Folder/NDVI/` (2200 images)

The dataset will automatically match pairs by filename (e.g., `0A.tif` in RGB matches `0A.tif` in NDVI).

---

## Step 3: Train the Model

Run the training script:

```bash
python train.py
```

**What happens:**
1. Loads all 2200 image pairs
2. Trains for 100 epochs (you can stop early with Ctrl+C)
3. Saves checkpoints every 10 epochs in `models/` folder
4. Creates a loss plot: `training_losses.png`
5. Saves final model: `models/generator_final.pth`

**Training time estimate:**
- On M1 Mac with MPS: ~2-4 hours for 100 epochs
- You can reduce `NUM_EPOCHS` in `train.py` if you want faster results

**What to watch:**
- Generator loss should decrease over time
- Discriminator loss should stabilize around 0.5-0.7
- If you see "out of memory" errors, reduce `BATCH_SIZE` in `train.py`

---

## Step 4: Test the Model

After training, test on sample images:

```bash
python test.py
```

**What happens:**
1. Loads the trained model
2. Tests on 5 random images from your dataset
3. Creates side-by-side comparisons in `outputs/` folder
4. Shows: Input RGB | Generated NDVI | Real NDVI

---

## Step 5: Use the Web Interface (Optional)

Launch the interactive web app:

```bash
streamlit run app.py
```

**What happens:**
1. Opens a web browser automatically
2. Upload any RGB farm image
3. Get instant NDVI prediction
4. Download the result

---

## 📁 Project Structure

```
ndvi-project/
├── data/
│   ├── rgb/          # (empty - for future custom data)
│   └── ndvi/         # (empty - for future custom data)
├── models/           # Saved model checkpoints
├── outputs/          # Test results
├── Main Folder/      # Your existing data
│   ├── RGB/          # 2200 RGB images
│   └── NDVI/         # 2200 NDVI images
├── train.py          # Training script
├── test.py           # Testing script
├── app.py            # Web interface
├── model.py          # Neural network definitions
├── dataset.py        # Data loading
└── requirements.txt  # Dependencies
```

---

## 🔧 Troubleshooting

### "MPS backend out of memory"
- Reduce `BATCH_SIZE` in `train.py` (try 2 or 1)
- Close other applications

### "No module named 'torch'"
- Make sure you're in your virtual environment
- Run: `pip install torch torchvision`

### Training is slow
- This is normal! GANs take time
- M1 MPS is much faster than CPU
- You can reduce `NUM_EPOCHS` for testing

### Images look weird
- Make sure RGB and NDVI filenames match exactly
- Check that images are valid .tif files

---

## 🎯 Quick Start Commands

```bash
# 1. Install everything
pip install torch torchvision numpy Pillow matplotlib tqdm opencv-python streamlit

# 2. Train the model (takes 2-4 hours)
python train.py

# 3. Test the model
python test.py

# 4. Launch web interface
streamlit run app.py
```

---

## 📊 Understanding the Output

**Generator Loss**: How well the generator creates realistic NDVI
- Should decrease over time
- Target: < 50 after 100 epochs

**Discriminator Loss**: How well the discriminator detects fakes
- Should stabilize around 0.5-0.7
- Too low = discriminator is too weak
- Too high = generator is too weak

---

## 🎓 Next Steps

1. **Experiment with hyperparameters** in `train.py`:
   - `BATCH_SIZE`: Larger = faster but needs more memory
   - `NUM_EPOCHS`: More = better quality but takes longer
   - `LAMBDA_L1`: Higher = more pixel-accurate, lower = more creative

2. **Try different architectures**:
   - Modify layer sizes in `model.py`
   - Add more skip connections

3. **Use your own data**:
   - Put new images in `data/rgb/` and `data/ndvi/`
   - Update paths in `train.py`

---

Good luck! 🚀
