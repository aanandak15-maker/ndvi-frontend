#!/bin/bash

# NDVI.AI Development Server Startup Script

echo "🚀 Starting NDVI.AI Development Environment..."
echo ""

# Check if model exists
if [ ! -f "models/generator_final.pth" ]; then
    echo "⚠️  Warning: Model file not found at models/generator_final.pth"
    echo "   Please train the model first by running: python train.py"
    echo ""
fi

# Start FastAPI backend
echo "🔧 Starting FastAPI backend on http://localhost:8000..."
python api_server.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start Next.js frontend
echo "🎨 Starting Next.js frontend on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers started!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
