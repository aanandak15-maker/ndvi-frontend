"""
Simple image conversion server - converts TIFF to PNG on-the-fly
No model training required, just serves converted images
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from pathlib import Path

app = FastAPI(title="NDVI Image Server")

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def convert_tif_to_png(tif_path: Path) -> bytes:
    """Convert TIFF to PNG in memory and return bytes."""
    try:
        img = Image.open(tif_path).convert('RGB')
        # Resize for web display (optional, adjust as needed)
        img.thumbnail((800, 800), Image.Resampling.LANCZOS)
        
        # Convert to PNG bytes
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)
        return buffer.getvalue()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "NDVI Image Conversion Server",
        "description": "Converts TIFF images to PNG on-the-fly"
    }

@app.get("/samples/{sample_id}")
async def get_sample(sample_id: int):
    """
    Serve sample images converted from TIFF to PNG
    sample_id: 1-5
    """
    # Map sample IDs to actual TIFF files
    sample_map = {
        1: "0B.tif",
        2: "1B.tif",
        3: "3B.tif",
        4: "23A.tif",
        5: "34A.tif"
    }
    
    if sample_id not in sample_map:
        raise HTTPException(status_code=404, detail="Sample not found")
    
    tif_path = Path(sample_map[sample_id])
    
    if not tif_path.exists():
        raise HTTPException(status_code=404, detail=f"Image file not found: {tif_path}")
    
    # Convert and return PNG
    png_bytes = convert_tif_to_png(tif_path)
    return Response(content=png_bytes, media_type="image/png")

@app.get("/image/{filename}")
async def get_image(filename: str):
    """
    Convert any TIFF file to PNG on-the-fly
    Supports files from Main Folder structure
    """
    # Try different possible locations
    possible_paths = [
        Path(filename),
        Path("Main Folder/RGB") / filename,
        Path("Main Folder/NDVI") / filename,
    ]
    
    tif_path = None
    for path in possible_paths:
        if path.exists():
            tif_path = path
            break
    
    if not tif_path:
        raise HTTPException(status_code=404, detail=f"Image not found: {filename}")
    
    # Convert and return PNG
    png_bytes = convert_tif_to_png(tif_path)
    return Response(content=png_bytes, media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting NDVI Image Conversion Server...")
    print("📸 Converting TIFF images to PNG on-the-fly")
    print("🌐 Server: http://localhost:8000")
    print("📷 Sample images: http://localhost:8000/samples/1 through /samples/5")
    uvicorn.run(app, host="0.0.0.0", port=8000)
