"""
Test script to verify TIFF upload functionality
"""

import requests
from pathlib import Path

def test_upload(image_path: str):
    """Test uploading an image to the server."""
    
    url = "http://localhost:8000/analyze"
    
    # Open and upload file
    with open(image_path, 'rb') as f:
        files = {'file': (Path(image_path).name, f, 'image/tiff')}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Upload successful!")
        print(f"   Status: {data.get('success')}")
        print(f"   Message: {data.get('health', {}).get('message')}")
        print(f"   Model: {data.get('model_info', {}).get('name')}")
        return True
    else:
        print(f"❌ Upload failed: {response.status_code}")
        print(f"   Error: {response.text}")
        return False

if __name__ == "__main__":
    print("Testing TIFF file upload...\n")
    
    # Test with a sample TIFF file
    test_files = ["0B.tif", "1B.tif", "3B.tif"]
    
    for test_file in test_files:
        if Path(test_file).exists():
            print(f"\nTesting: {test_file}")
            test_upload(test_file)
            break
    else:
        print("❌ No test files found")
