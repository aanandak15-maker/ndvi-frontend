#!/bin/bash

# Simple startup - just image conversion, no AI model needed

echo "🚀 Starting NDVI.AI (Simple Mode - No Model Required)"
echo ""
echo "This mode only converts TIFF images to PNG for display."
echo "No AI model training or loading required!"
echo ""

# Start image conversion server
echo "📸 Starting Image Conversion Server on http://localhost:8000..."
python image_server.py &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Start Next.js frontend
echo "🎨 Starting Next.js frontend on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Image Server: http://localhost:8000"
echo "📷 Sample Images: http://localhost:8000/samples/1 through /samples/5"
echo ""
echo "ℹ️  This is SIMPLE MODE - only image display, no AI analysis"
echo "   To enable AI analysis, you need to train the model first"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $SERVER_PID $FRONTEND_PID; exit" INT
wait
