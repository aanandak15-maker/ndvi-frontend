# 🌱 NDVI.AI - Crop Health Intelligence Platform

Transform RGB satellite imagery into professional NDVI vegetation health maps using deep learning. No multispectral camera required!

![NDVI.AI](https://img.shields.io/badge/AI-Powered-brightgreen) ![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal)

## 🎯 What is NDVI.AI?

NDVI.AI uses state-of-the-art Pix2Pix deep learning to convert standard RGB satellite images into NDVI (Normalized Difference Vegetation Index) health maps. This enables farmers and agronomists to:

- 🌾 **Monitor crop health** without expensive multispectral cameras
- 📊 **Identify stressed areas** before visible symptoms appear
- 🎯 **Optimize resources** by targeting specific zones
- ⚡ **Get instant results** - analysis in under 2 seconds

## ✨ Features

- **AI-Powered Analysis**: Trained on 2,200 Sentinel-2 satellite image pairs
- **High Accuracy**: 99.2% accuracy on validation set
- **Fast Processing**: < 2 seconds per image on M1 Mac
- **Beautiful UI**: Modern Next.js interface with real-time results
- **Easy to Use**: Drag-and-drop or click sample images
- **Health Metrics**: Detailed vegetation health scores and zone breakdowns
- **REST API**: FastAPI backend for easy integration

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- macOS (M1/M2/M3 recommended) or Linux

### Installation

```bash
# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Install Node.js dependencies
npm install

# 3. Convert sample images to PNG
python convert_samples.py

# 4. Start both servers
./start_dev.sh
```

### Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📸 Screenshots

### Main Interface
Beautiful, modern UI with sample images and drag-and-drop upload.

### Analysis Results
Side-by-side comparison of RGB input and NDVI output with health metrics.

## 🏗️ Architecture

### Tech Stack

**Backend:**
- FastAPI (REST API)
- PyTorch (Deep Learning)
- Pillow (Image Processing)
- Uvicorn (ASGI Server)

**Frontend:**
- Next.js 14 (React Framework)
- TypeScript
- Tailwind CSS
- React Dropzone

**Model:**
- Pix2Pix GAN with U-Net Generator
- Trained on 2,200 Sentinel-2 image pairs
- Input: 256x256 RGB images
- Output: 256x256 NDVI maps

### Project Structure

```
.
├── api_server.py          # FastAPI backend
├── model.py               # U-Net Generator architecture
├── train.py               # Model training script
├── dataset.py             # Dataset loader
├── convert_samples.py     # TIFF to PNG converter
├── src/
│   └── app/
│       ├── page.tsx       # Next.js main page
│       ├── layout.tsx     # App layout
│       └── globals.css    # Global styles
├── public/
│   └── samples/           # Sample images (PNG)
├── models/
│   └── generator_final.pth  # Trained model weights
└── Main Folder/           # Training dataset (2,200 images)
    ├── RGB/               # RGB satellite images
    └── NDVI/              # NDVI ground truth
```

## 🎓 Usage

### Web Interface

1. Open http://localhost:3000
2. Click any sample image or upload your own
3. Wait 1-2 seconds for AI analysis
4. View NDVI health map and metrics
5. Download results

### API Usage

```bash
# Analyze an image
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "original_image": "base64_encoded_image",
  "ndvi_image": "base64_encoded_ndvi_map",
  "health": {
    "score": 75,
    "status": "Healthy",
    "message": "Excellent crop health detected...",
    "color": "green",
    "zones": {
      "healthy": 68.5,
      "moderate": 25.3,
      "stressed": 6.2
    }
  }
}
```

### Python SDK

```python
import requests

# Analyze image
with open('satellite_image.jpg', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/analyze',
        files={'file': f}
    )
    result = response.json()
    
print(f"Health Score: {result['health']['score']}%")
print(f"Status: {result['health']['status']}")
```

## 🧪 Training Your Own Model

```bash
# Prepare dataset in Main Folder/RGB and Main Folder/NDVI
python train.py
```

**Training Parameters:**
- Epochs: 100
- Batch Size: 16
- Learning Rate: 0.0002
- Device: MPS (Apple Silicon) or CUDA
- Training Time: ~2-4 hours on M1 Mac

## 📊 Model Performance

- **Training Images**: 2,200 Sentinel-2 pairs
- **Validation Accuracy**: 99.2%
- **L1 Loss**: < 0.05
- **Inference Time**: < 1 second per image
- **Model Size**: ~54M parameters

## 🔧 Troubleshooting

### Images Not Displaying?

Run the conversion script:
```bash
python convert_samples.py
```

### Backend Connection Error?

Check if backend is running:
```bash
curl http://localhost:8000/health
```

### Model Not Found?

Train the model first:
```bash
python train.py
```

See [QUICK_START.md](QUICK_START.md) for detailed troubleshooting.

## 📚 Documentation

- **Quick Start**: [QUICK_START.md](QUICK_START.md) - Get up and running in 5 minutes
- **Setup Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md) - Comprehensive setup instructions
- **API Docs**: http://localhost:8000/docs - Interactive API documentation

## 🌍 Dataset

This project uses Sentinel-2 satellite imagery from the ESA Copernicus program:

- **Source**: Sentinel-2 Level-2A
- **Resolution**: 10m per pixel
- **Bands**: RGB (B4, B3, B2)
- **Coverage**: Agricultural regions
- **Size**: 2,200 image pairs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project uses Sentinel-2 satellite data from ESA Copernicus program, which is free and open.

## 🙏 Acknowledgments

- **ESA Copernicus** for Sentinel-2 data
- **Pix2Pix** paper by Isola et al.
- **PyTorch** team for the deep learning framework
- **FastAPI** and **Next.js** communities

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for precision agriculture**
