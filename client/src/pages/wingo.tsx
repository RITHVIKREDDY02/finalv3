import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Trophy, Clock, TrendingUp, Eye } from "lucide-react";
import { useLocation } from "wouter";
import wingoIssueImage from "@assets/wingoissue-2e0f92ab_1754126687302.webp";

type WingoVariant = "30sec" | "1min" | "3min" | "5min";

interface WingoResult {
  issueNumber: string;
  number: number;
  timestamp: number;
}

interface WingoPrediction {
  period: string;
  prediction: "BIG" | "SMALL";
  confidence: number;
  countdown: number;
}

export default function Wingo() {
  const [, navigate] = useLocation();
  const [selectedVariant, setSelectedVariant] = useState<WingoVariant>("30sec");
  const [countdown, setCountdown] = useState(45);

  // Fetch prediction data for selected variant
  const { data: prediction } = useQuery<WingoPrediction>({
    queryKey: [`/api/wingo/prediction/${selectedVariant}`],
    refetchInterval: 30000,
    enabled: !!selectedVariant,
  });

  // Fetch results data for selected variant
  const { data: results = [] } = useQuery<WingoResult[]>({
    queryKey: [`/api/wingo/results/${selectedVariant}`],
    refetchInterval: 15000,
    enabled: !!selectedVariant,
  });

  // Countdown timer
  useEffect(() => {
    if (!prediction) return;
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          const seconds = getIntervalSeconds(selectedVariant);
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedVariant, prediction]);

  const getIntervalSeconds = (variant: WingoVariant): number => {
    switch (variant) {
      case "30sec": return 30;
      case "1min": return 60;
      case "3min": return 180;
      case "5min": return 300;
      default: return 30;
    }
  };

  const getBigSmall = (number: number): "BIG" | "SMALL" => {
    return number >= 5 ? "BIG" : "SMALL";
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `00:${seconds.toString().padStart(2, '0')}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const variants = [
    { key: "30sec" as WingoVariant, label: "Wingo 30Sec", time: "30s", icon: "⚡" },
    { key: "1min" as WingoVariant, label: "Wingo 1Min", time: "1m", icon: "🚀" },
    { key: "3min" as WingoVariant, label: "Wingo 3Min", time: "3m", icon: "💎" },
    { key: "5min" as WingoVariant, label: "Wingo 5Min", time: "5m", icon: "👑" }
  ];

  // Get number color based on value (0-9)
  const getNumberColor = (num: number): string => {
    if ([0, 1, 2, 3, 4].includes(num)) return "text-emerald-500";
    if ([5, 6, 7, 8, 9].includes(num)) return "text-red-500";
    return "text-gray-500";
  };

  // Get number background based on value
  const getNumberBg = (num: number): string => {
    if ([0, 1, 2, 3, 4].includes(num)) return "bg-emerald-500/20 border-emerald-500";
    if ([5, 6, 7, 8, 9].includes(num)) return "bg-red-500/20 border-red-500";
    return "bg-gray-500/20 border-gray-500";
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-white">WINGO GAMES</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex justify-center items-start pt-6">
        <div className="w-[448px] h-[402px] mx-0">
          {/* Tab Navigation */}
          <div style={{ backgroundColor: '#382e35', borderRadius: '16px', padding: '8px' }}>
            <div className="flex gap-1">
              {variants.map((variant) => (
                <button
                  key={variant.key}
                  onClick={() => setSelectedVariant(variant.key)}
                  className={`flex-1 font-medium transition-all duration-200 ${
                    selectedVariant === variant.key
                      ? 'text-black shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ 
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: selectedVariant === variant.key 
                      ? 'rgba(255,208,90,254)'
                      : 'transparent'
                  }}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div className="mt-4 relative">
            <img 
              src={wingoIssueImage}
              alt="Wingo Issue Background"
              className="w-full h-auto"
              style={{ 
                height: '106.66px'
              }}
            />
            
            {/* Text Overlays */}
            <div className="absolute inset-0 flex justify-between items-center px-6">
              {/* Left Side */}
              <div className="text-left">
                <div className="text-black font-bold text-lg">
                  {variants.find(v => v.key === selectedVariant)?.label || "Wingo 30Sec"}
                </div>
                <div className="text-black font-bold text-lg">
                  {prediction?.period || "20250802100010584"}
                </div>
              </div>
              
              {/* Right Side */}
              <div className="text-right">
                <div className="text-black font-bold text-lg">Time Remaining</div>
                <div className="text-black/80 text-xl font-mono font-bold">
                  {formatTime(countdown)}
                </div>
              </div>
            </div>
          </div>

          {/* VIP Prediction Section */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <h3 className="text-white font-bold text-lg">VIP Prediction</h3>
            </div>
            
            {/* Prediction Model */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="text-sm font-bold mb-2" style={{ color: 'rgba(255,208,90,254)' }}>Color</div>
                  <div className={`w-8 h-8 rounded-lg mx-auto ${prediction?.prediction === 'BIG' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold mb-2" style={{ color: 'rgba(255,208,90,254)' }}>Size</div>
                  <div className="text-white font-bold text-xl">
                    {prediction?.prediction || "BIG"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold mb-2" style={{ color: 'rgba(255,208,90,254)' }}>Number</div>
                  <div className="text-white font-bold text-xl">7</div>
                </div>
              </div>
            </div>
          </div>

          {/* Game History Section */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: '#ffd05a' }}></div>
              <h3 className="text-white font-bold text-xl">Game History</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
            </div>
            <div className="space-y-4">
              {results?.slice(0, 3).map((result, index) => (
                <div key={result.issueNumber} className="rounded-2xl p-4 shadow-lg border border-gray-600/30 backdrop-blur-sm" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                  {/* Header with Period and Status */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-black px-4 py-2 rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: '#ffd05a' }}>
                        #{result.issueNumber.slice(-6)}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {new Date(result.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      COMPLETED
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-black/20 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Predicted Section */}
                      <div className="text-center flex-1">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Predicted</div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <div className={`text-white px-3 py-1 rounded-lg font-bold text-xs shadow-lg ${index % 2 === 0 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                              {index % 2 === 0 ? 'BIG' : 'SMALL'}
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-gray-800"></div>
                          </div>
                          <div className={`text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border ${result.number >= 5 ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400'}`}>
                            {result.number}
                          </div>
                        </div>
                      </div>

                      {/* VS Divider */}
                      <div className="flex flex-col items-center">
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                        <div className="text-gray-400 font-bold text-xs my-1 px-2 py-1 rounded bg-white/5">VS</div>
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                      </div>

                      {/* Actual Section */}
                      <div className="text-center flex-1">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-medium">Actual</div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative">
                            <div className={`text-white px-3 py-1 rounded-lg font-bold text-xs shadow-lg ${result.number >= 5 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                              {result.number >= 5 ? 'BIG' : 'SMALL'}
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className={`text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border ${result.number >= 5 ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400'}`}>
                            {result.number}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Result Badge */}
                  <div className="flex justify-center">
                    {(index % 2 === 0 && result.number >= 5) || (index % 2 === 1 && result.number < 5) ? (
                      <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        </div>
                        WIN
                      </div>
                    ) : (
                      <div className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        </div>
                        LOSS
                      </div>
                    )}
                  </div>
                </div>
              )) || (
                <div className="rounded-2xl p-8 text-center shadow-lg border border-gray-600/30" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                  <div className="text-4xl mb-3">⏳</div>
                  <div className="text-gray-300 font-medium">Loading history...</div>
                  <div className="text-gray-500 text-sm mt-1">Please wait while we fetch the latest results</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}