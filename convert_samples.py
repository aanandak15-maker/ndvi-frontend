"""
Convert TIFF sample images to PNG format for web display
"""

from PIL import Image
from pathlib import Path
import shutil

def convert_tif_to_png(tif_path: Path, png_path: Path):
    """Convert a TIFF image to PNG format."""
    try:
        img = Image.open(tif_path).convert('RGB')
        img.save(png_path, 'PNG')
        print(f"✅ Converted: {tif_path.name} -> {png_path.name}")
        return True
    except Exception as e:
        print(f"❌ Failed to convert {tif_path.name}: {e}")
        return False

def main():
    """Convert sample TIFF images to PNG for web display."""
    
    # Sample images in root directory
    root_samples = [
        "0B.tif",
        "1B.tif", 
        "3B.tif",
        "23A.tif",
        "34A.tif",
        "9A.tif"
    ]
    
    # Create public/samples directory if it doesn't exist
    samples_dir = Path("public/samples")
    samples_dir.mkdir(parents=True, exist_ok=True)
    
    print("🔄 Converting TIFF samples to PNG format...\n")
    
    converted = 0
    failed = 0
    
    # Convert root samples
    for i, tif_name in enumerate(root_samples[:5], 1):  # Only first 5 for samples
        tif_path = Path(tif_name)
        if tif_path.exists():
            png_path = samples_dir / f"sample{i}.png"
            if convert_tif_to_png(tif_path, png_path):
                converted += 1
            else:
                failed += 1
        else:
            print(f"⚠️  File not found: {tif_name}")
            failed += 1
    
    print(f"\n📊 Summary:")
    print(f"   ✅ Converted: {converted}")
    print(f"   ❌ Failed: {failed}")
    print(f"\n💾 PNG files saved to: {samples_dir.absolute()}")

if __name__ == "__main__":
    main()
