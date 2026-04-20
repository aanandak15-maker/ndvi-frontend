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

export default function Home() {
  const [result, setResult]     = useState<AnalysisResult | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [preview, setPreview]   = useState<string | null>(null);

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
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
    } catch {
      setError("Cannot connect to AI server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".tif", ".tiff"] },
    multiple: false,
  });

  const statusColors: Record<string, string> = {
    green:  "text-green-400",
    yellow: "text-yellow-400",
    red:    "text-red-400",
  };

  const zoneBg: Record<string, string> = {
    healthy:  "bg-green-500",
    moderate: "bg-yellow-500",
    stressed: "bg-red-500",
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      
      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-sm font-bold">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight">NDVI Intelligence</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          AI Model Active
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Crop Health Intelligence
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Upload any RGB farm photo. Our AI converts it to an NDVI crop
            health map in seconds — no multispectral camera needed.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-200 mb-10
            ${isDragActive
              ? "border-green-400 bg-green-950/30"
              : "border-gray-700 hover:border-gray-500 bg-gray-900/50"}
          `}
        >
          <input {...getInputProps()} />
          
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400">Analysing crop health...</p>
            </div>
          ) : preview && !result ? (
            <div className="flex flex-col items-center gap-3">
              <img src={preview} alt="preview"
                   className="w-48 h-48 object-cover rounded-xl" />
              <p className="text-gray-500 text-sm">Processing...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl">
                🛰️
              </div>
              <p className="text-white font-medium">
                {isDragActive ? "Drop your farm image here" : "Drop a farm image or click to upload"}
              </p>
              <p className="text-gray-500 text-sm">
                Supports JPG, PNG, TIF — drone or satellite imagery
              </p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950/50 border border-red-800 rounded-xl p-4 mb-8 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Image Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm font-medium text-gray-400">Input — RGB Photo</p>
                </div>
                <img
                  src={`data:image/png;base64,${result.original_image}`}
                  alt="Original"
                  className="w-full h-72 object-cover"
                />
              </div>
              
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm font-medium text-gray-400">
                    AI Output — NDVI Health Map
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
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Overall Health Score</p>
                  <p className={`text-5xl font-bold ${statusColors[result.health.color]}`}>
                    {result.health.score}
                    <span className="text-2xl text-gray-500">%</span>
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium
                  ${result.health.color === "green"  ? "bg-green-950 text-green-400 border border-green-800" :
                    result.health.color === "yellow" ? "bg-yellow-950 text-yellow-400 border border-yellow-800" :
                                                        "bg-red-950 text-red-400 border border-red-800"}
                `}>
                  {result.health.status}
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">{result.health.message}</p>
              
              {/* Zone Bars */}
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Zone Breakdown</p>
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
                { label: "Model",        value: result.model_info.name },
                { label: "Accuracy",     value: result.model_info.accuracy },
                { label: "Trained On",   value: result.model_info.trained_on },
              ].map((item) => (
                <div key={item.label}
                     className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm text-white font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Analyse Another */}
            <div className="text-center">
              <button
                onClick={() => { setResult(null); setPreview(null); }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm transition-colors"
              >
                Analyse Another Field →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
