"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface HealthData {
  score: number;
  status: string;
  message: string;
  color: string;
  zones: {
    healthy: number;
    moderate: number;
    stressed: number;
  };
}

interface AnalysisResult {
  success: boolean;
  original_image: string;
  ndvi_image: string;
  health: HealthData;
  model_info: {
    name: string;
    accuracy: string;
    trained_on: string;
  };
}

// Sample images for playground - use static images from public folder
const SAMPLE_IMAGES = [
  { id: 1, name: "Agricultural Field", file: "/samples/sample1.png", preview: "/samples/sample1.png", emoji: "🌾" },
  { id: 2, name: "Mixed Vegetation", file: "/samples/sample2.png", preview: "/samples/sample2.png", emoji: "🌿" },
  { id: 3, name: "Crop Rotation", file: "/samples/sample3.png", preview: "/samples/sample3.png", emoji: "🌱" },
  { id: 4, name: "Dense Farmland", file: "/samples/sample4.png", preview: "/samples/sample4.png", emoji: "🚜" },
  { id: 5, name: "Varied Terrain", file: "/samples/sample5.png", preview: "/samples/sample5.png", emoji: "🗺️" },
];

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const analyzeImage = async (file: File | string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // For sample images, fetch and send to backend for analysis
      if (typeof file === "string") {
        const response = await fetch(file);
        const blob = await response.blob();
        
        // Convert blob to File object
        const imageFile = new File([blob], "sample.png", { type: "image/png" });
        
        // Send to backend for analysis
        const form = new FormData();
        form.append("file", imageFile);
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        
        try {
          const res = await fetch(`${apiUrl}/analyze`, {
            method: "POST",
            body: form,
          });
          
          if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
          }
          
          const data = await res.json();
          
          if (data.success) {
            setResult(data);
          } else {
            setError(data.error || "Analysis failed");
          }
        } catch (apiError) {
          // Backend not available - just display the image
          console.log("Backend not available, displaying image only");
          
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            const base64Data = base64.split(',')[1];
            
            setResult({
              success: true,
              original_image: base64Data,
              ndvi_image: base64Data,
              health: {
                score: 0,
                status: "Display Only",
                message: "Backend not available. Image displayed without analysis.",
                color: "gray",
                zones: {
                  healthy: 0,
                  moderate: 0,
                  stressed: 0
                }
              },
              model_info: {
                name: "Frontend Only Mode",
                accuracy: "Backend required for analysis",
                trained_on: "Run ./start_simple.sh locally"
              }
            });
          };
          reader.readAsDataURL(blob);
        }
        setLoading(false);
        return;
      }
      
      // For uploaded files, try backend if available, otherwise just display
      const form = new FormData();
      form.append("file", file);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      try {
        const res = await fetch(`${apiUrl}/analyze`, {
          method: "POST",
          body: form,
        });
        
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success) {
          setResult(data);
        } else {
          setError(data.error || "Analysis failed");
        }
      } catch (apiError) {
        // Backend not available - just display the image
        console.log("Backend not available, displaying image only");
        
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1];
          
          setResult({
            success: true,
            original_image: base64Data,
            ndvi_image: base64Data,
            health: {
              score: 0,
              status: "Display Only",
              message: "Image displayed successfully. Backend server not available. For AI analysis, run ./start_simple.sh locally.",
              color: "gray",
              zones: {
                healthy: 0,
                moderate: 0,
                stressed: 0
              }
            },
            model_info: {
              name: "Frontend Only Mode",
              accuracy: "Backend required for analysis",
              trained_on: "See documentation for setup"
            }
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to process image. For full functionality, run the backend server locally.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    await analyzeImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      "image/*": [".jpg", ".jpeg", ".png", ".tif", ".tiff"],
      "image/tiff": [".tif", ".tiff"]
    },
    multiple: false,
  });

  const statusColors: Record<string, string> = {
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  const zoneBg: Record<string, string> = {
    healthy: "bg-emerald-500",
    moderate: "bg-yellow-500",
    stressed: "bg-red-500",
  };

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">NDVI.AI</h1>
              <p className="text-xs text-gray-400">Crop Health Intelligence</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
            <span className="text-emerald-400 text-sm font-medium">Powered by Deep Learning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Satellite Images
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              Into NDVI-like Health Maps
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            AI-powered tool converts RGB satellite imagery into approximate NDVI vegetation health maps. 
            Results are NDVI-like estimates, not exact multispectral NDVI measurements.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { value: "2,200+", label: "Training Images" },
              { value: "~86.6%", label: "Model Accuracy" },
              { value: "Sentinel-2", label: "Data Source" },
              { value: "<2s", label: "Processing Time" },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-gray-400 text-lg">
              Click any sample image below or upload your own satellite imagery
            </p>
          </div>

          {/* Sample Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => !loading && analyzeImage(sample.file)}
                disabled={loading}
                className="group relative overflow-hidden rounded-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
                <img 
                  src={sample.preview} 
                  alt={sample.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-48 bg-slate-800 flex items-center justify-center text-5xl">${sample.emoji}</div>`;
                    }
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <p className="text-sm font-semibold text-white mb-1">{sample.name}</p>
                  <div className="text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to analyze →
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`relative overflow-hidden rounded-3xl border-2 border-dashed transition-all cursor-pointer ${
              isDragActive
                ? "border-emerald-400 bg-emerald-500/5"
                : "border-white/10 hover:border-white/20 bg-slate-900/30"
            }`}
          >
            <input {...getInputProps()} />
            <div className="p-16 text-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-lg">Analyzing crop health...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
                    📤
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white mb-2">
                      {isDragActive ? "Drop your image here" : "Upload Your Own Image"}
                    </p>
                    <p className="text-gray-400">
                      Drag and drop or click to browse • Supports JPG, PNG, <strong>TIF/TIFF</strong>
                    </p>
                    <p className="text-sm text-emerald-400 mt-2">
                      ✨ TIFF files are automatically converted for analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-center">
              ⚠️ {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-20 px-6 animate-in fade-in duration-700">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Analysis Complete</h2>
              <p className="text-gray-400 text-lg">AI-generated NDVI-like health map (approximate, not exact multispectral NDVI)</p>
            </div>

            {/* Image Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="relative group overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                <div className="p-4 relative z-20">
                  <p className="text-sm font-semibold text-gray-400 mb-3">Original RGB Image</p>
                </div>
                <img
                  src={`data:image/png;base64,${result.original_image}`}
                  alt="Original"
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="relative group overflow-hidden rounded-3xl bg-slate-900/50 border border-emerald-500/30">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                <div className="p-4 relative z-20">
                  <p className="text-sm font-semibold text-emerald-400 mb-3">NDVI-like Health Map (Approximate)</p>
                </div>
                <img
                  src={`data:image/png;base64,${result.ndvi_image}`}
                  alt="NDVI"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>

            {/* Health Score */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 p-8 mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Overall Health Score</p>
                    <p className={`text-6xl font-bold ${statusColors[result.health.color]}`}>
                      {result.health.score}%
                    </p>
                  </div>
                  <div className={`px-6 py-3 rounded-full text-sm font-semibold ${
                    result.health.color === "green"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : result.health.color === "yellow"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {result.health.status}
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8">{result.health.message}</p>

                {/* Zone Breakdown */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                    Vegetation Zones
                  </p>
                  {(["healthy", "moderate", "stressed"] as const).map((zone) => (
                    <div key={zone} className="flex items-center gap-4">
                      <span className="text-sm text-gray-300 w-24 capitalize font-medium">
                        {zone}
                      </span>
                      <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${zoneBg[zone]} transition-all duration-1000`}
                          style={{ width: `${result.health.zones[zone]}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-16 text-right font-mono">
                        {result.health.zones[zone]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setPreview(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
              >
                Analyze Another Image
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Precision Agriculture, Powered by AI
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              NDVI.AI uses deep learning trained on thousands of Sentinel-2 satellite images 
              to deliver NDVI-like crop health analysis. Results are approximate estimates 
              based on RGB imagery, not exact multispectral NDVI measurements.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["~86.6% Accurate", "Fast", "RGB-based", "NDVI-like Output"].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 NDVI.AI • Advanced Crop Health Intelligence Platform</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
