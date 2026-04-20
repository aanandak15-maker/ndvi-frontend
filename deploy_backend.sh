#!/bin/bash

echo "🚀 Backend Deployment Helper"
echo ""
echo "This script will help you deploy your backend to Render or Railway"
echo ""

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found!"
    exit 1
fi

echo "✅ render.yaml found"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized!"
    echo "Run: git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if sample TIFF files are tracked
echo "📸 Checking sample TIFF files..."
TIFF_COUNT=$(git ls-files "*.tif" 2>/dev/null | wc -l | tr -d ' ')

if [ "$TIFF_COUNT" -eq "0" ]; then
    echo "⚠️  Sample TIFF files not tracked by git"
    echo "   Adding sample files..."
    git add -f 0B.tif 1B.tif 3B.tif 23A.tif 34A.tif 9A.tif 2>/dev/null
    echo "✅ Sample files added"
else
    echo "✅ $TIFF_COUNT TIFF files tracked"
fi
echo ""

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes"
    echo ""
    echo "Committing changes..."
    git add render.yaml image_server.py BACKEND_DEPLOYMENT.md
    git commit -m "Add backend deployment configuration"
    echo "✅ Changes committed"
    echo ""
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Pushed to GitHub successfully"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Deploy Backend on Render:"
echo "   • Go to https://render.com"
echo "   • Sign up/login with GitHub"
echo "   • Click 'New +' → 'Web Service'"
echo "   • Select repository: aanandak15-maker/ndvi-frontend"
echo "   • Render will auto-detect render.yaml"
echo "   • Click 'Create Web Service'"
echo "   • Wait for deployment (~2-3 minutes)"
echo "   • Copy your backend URL (e.g., https://ndvi-backend.onrender.com)"
echo ""
echo "2. Update Vercel Frontend:"
echo "   • Go to https://vercel.com/dashboard"
echo "   • Select your project: ndvi-frontend-iota"
echo "   • Go to Settings → Environment Variables"
echo "   • Add new variable:"
echo "     - Key: NEXT_PUBLIC_API_URL"
echo "     - Value: https://your-backend.onrender.com"
echo "   • Go to Deployments → Redeploy"
echo ""
echo "3. Test Your App:"
echo "   • Visit https://ndvi-frontend-iota.vercel.app"
echo "   • Click a sample image"
echo "   • Should load without 'Backend not available' message"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 For detailed instructions, see BACKEND_DEPLOYMENT.md"
echo ""
