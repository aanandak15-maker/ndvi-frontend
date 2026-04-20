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

// Sample images for playground
const SAMPLE_IMAGES = [
  { id: 1, name: "Agricultural Field", file: "0B.tif", emoji: "🌾" },
  { id: 2, name: "Mixed Vegetation", file: "1B.tif", emoji: "🌿" },
  { id: 3, name: "Crop Rotation", file: "3B.tif", emoji: "🌱" },
  { id: 4, name: "Dense Farmland", file: "23A.tif", emoji: "🚜" },
  { id: 5, name: "Varied Terrain", file: "34A.tif", emoji: "🗺️" },
];

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"playground" | "upload">("playground");

  const analyzeImage = async (file: File | string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      
      if (typeof file === "string") {
        // Sample image - fetch from backend
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/analyze-sample`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sample: file }),
        });
        const data = await res.json();
        
        if (data.success) {
          setResult(data);
        } else {
          setError(data.error || "Analysis failed");
        }
      } else {
        // User uploaded file
        form.append("file", file);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/analyze";
        const res = await fetch(apiUrl, {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        
        if (data.success) {
          setResult(data);
        } else {
          setError(data.error || "Analysis failed");
        }
      }
    } catch {
      setError("Cannot connect to AI server. Make sure backend is running.");
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
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".tif", ".tiff"] },
    multiple: false,
  });

  const statusColors: Record<string, string> = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  const zoneBg: Record<string, string> = {
    healthy: "bg-green-500",
    moderate: "bg-yellow-500",
    stressed: "bg-red-500",
  };

  return (
    <main className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-blue-900/50 bg-gradient-to-r from-blue-950/80 to-slate-950/80 backdrop-blur-sm px-8 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-green-500/30">
              🌱
            </div>
            <div>
              <h1 className="font-bold text-2xl tracking-tight bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                NDVI.AI
              </h1>
              <p className="text-xs text-gray-400">Crop Health Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI Model Active
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Training Images", value: "2,200", icon: "📊" },
            { label: "Model Accuracy", value: "99.2%", icon: "🎯" },
            { label: "Data Source", value: "Sentinel-2", icon: "🛰️" },
            { label: "Processing", value: "Real-time", icon: "⚡" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-4 text-center hover:border-blue-600/50 transition-all"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveSection("playground")}
            className={`px-6 py-3 font-semibold transition-all relative ${
              activeSection === "playground"
                ? "text-green-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            🎮 Playground
            {activeSection === "playground" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400" />
            )}
          </button>
          <button
            onClick={() => setActiveSection("upload")}
            className={`px-6 py-3 font-semibold transition-all relative ${
              activeSection === "upload"
                ? "text-blue-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            📤 Upload Your Own
            {activeSection === "upload" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400" />
            )}
          </button>
        </div>

        {/* Playground Section */}
        {activeSection === "playground" && (
          <div className="space-y-8 animate-in">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2 text-green-400">
                🎮 Try Sample Images
              </h2>
              <p className="text-gray-400">
                Select one of our sample satellite images to see NDVI.AI in action instantly!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => analyzeImage(sample.file)}
                  disabled={loading}
                  className="group bg-gradient-to-br from-slate-900/80 to-blue-900/40 border-2 border-gray-800 hover:border-green-500 rounded-2xl p-4 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-4xl mb-3">{sample.emoji}</div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Sample {sample.id}
                  </p>
                  <p className="text-xs text-gray-400">{sample.name}</p>
                  <div className="mt-3 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to analyze →
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        {activeSection === "upload" && (
          <div className="animate-in">
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2 text-blue-400">
                📤 Upload Your Own Image
              </h2>
              <p className="text-gray-400">
                Upload your own satellite or aerial imagery to generate professional NDVI crop health maps.
              </p>
            </div>

            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                transition-all duration-200
                ${
                  isDragActive
                    ? "border-blue-400 bg-blue-950/30"
                    : "border-gray-700 hover:border-gray-500 bg-gray-900/50"
                }
              `}
            >
              <input {...getInputProps()} />

              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400">🧠 AI is analyzing crop health...</p>
                </div>
              ) : preview && !result ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-48 h-48 object-cover rounded-xl"
                  />
                  <p className="text-gray-500 text-sm">Processing...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl flex items-center justify-center text-3xl">
                    🛰️
                  </div>
                  <p className="text-white font-medium">
                    {isDragActive
                      ? "Drop your farm image here"
                      : "Drop a farm image or click to upload"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports JPG, PNG, TIF — drone or satellite imagery
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950/50 border border-red-800 rounded-xl p-4 mt-8 text-red-400 text-sm animate-in">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 mt-12 animate-in">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-green-400">📊 Analysis Results</h2>
            </div>

            {/* Image Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 rounded-2xl overflow-hidden border border-gray-800">
                <div className="px-4 py-3 border-b border-gray-800 bg-slate-900/50">
                  <p className="text-sm font-semibold text-gray-300">🛰️ Input RGB Satellite Image</p>
                </div>
                <img
                  src={`data:image/png;base64,${result.original_image}`}
                  alt="Original"
                  className="w-full h-72 object-cover"
                />
              </div>

              <div className="bg-gradient-to-br from-slate-900/80 to-green-900/40 rounded-2xl overflow-hidden border border-gray-800">
                <div className="px-4 py-3 border-b border-gray-800 bg-slate-900/50">
                  <p className="text-sm font-semibold text-gray-300">
                    🌿 Generated NDVI Health Map
                  </p>
                </div>
                <img
                  src={`data:image/png;base64,${result.ndvi_image}`}
                  alt="NDVI"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

            {/* Health Score Card */}
            <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Overall Health Score</p>
                  <p className={`text-5xl font-bold ${statusColors[result.health.color]}`}>
                    {result.health.score}
                    <span className="text-2xl text-gray-500">%</span>
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    result.health.color === "green"
                      ? "bg-green-950 text-green-400 border border-green-800"
                      : result.health.color === "yellow"
                      ? "bg-yellow-950 text-yellow-400 border border-yellow-800"
                      : "bg-red-950 text-red-400 border border-red-800"
                  }
                `}
                >
                  {result.health.status}
                </div>
              </div>

              <p className="text-gray-300 mb-6">{result.health.message}</p>

              {/* Zone Bars */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Zone Breakdown
                </p>
                {(["healthy", "moderate", "stressed"] as const).map((zone) => (
                  <div key={zone} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-20 capitalize">{zone}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${zoneBg[zone]} transition-all duration-700`}
                        style={{ width: `${result.health.zones[zone]}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-12 text-right">
                      {result.health.zones[zone]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Info */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Model", value: result.model_info.name, icon: "🤖" },
                { label: "Accuracy", value: result.model_info.accuracy, icon: "🎯" },
                { label: "Trained On", value: result.model_info.trained_on, icon: "📊" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gradient-to-br from-slate-900/80 to-blue-900/40 border border-gray-800 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Analyze Another */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setPreview(null);
                }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-green-500/30"
              >
                Analyze Another Field →
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 bg-gradient-to-br from-slate-900/80 to-blue-900/40 border border-gray-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            About NDVI.AI
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            NDVI.AI uses state-of-the-art deep learning to transform RGB satellite imagery
            into precise NDVI vegetation health maps. Our Pix2Pix model is trained on 2,200
            Sentinel-2 image pairs, delivering professional-grade crop health analysis in
            seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["🔒 Secure", "⚡ Fast", "🎯 Accurate", "🌍 Satellite-Grade"].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-800/50 rounded-full text-sm font-medium text-green-400"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-8">
            © 2026 NDVI.AI - Advanced Crop Health Intelligence Platform
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Powered by PyTorch • Sentinel-2 Data • Deep Learning
          </p>
        </div>
      </div>
    </main>
  );
}
