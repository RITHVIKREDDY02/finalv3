import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Trophy, Clock, TrendingUp, Eye } from "lucide-react";
import { useLocation } from "wouter";

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

      <div className="p-4">
        {/* Mobile Tab Navigation */}
        <div className="bg-gray-200 rounded-2xl p-1 shadow-sm">
          <div className="grid grid-cols-4 gap-0">
            {variants.map((variant) => (
              <button
                key={variant.key}
                onClick={() => setSelectedVariant(variant.key)}
                className={`py-3 px-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  selectedVariant === variant.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-6 space-y-4">
          {/* Current Game Display */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {variants.find(v => v.key === selectedVariant)?.label}
            </h2>
            <div className="text-white/70 text-sm mb-4">
              Period: {prediction?.period || "Loading..."}
            </div>
            
            {/* Timer */}
            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <div className="text-white/80 text-sm mb-1">Next Round In</div>
              <div className="text-3xl font-bold text-white font-mono">
                {formatTime(countdown)}
              </div>
            </div>

            {/* VIP Prediction */}
            {prediction && (
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-xl p-4 mb-4">
                <div className="text-yellow-300 text-sm font-medium mb-2">VIP PREDICTION</div>
                <div className="text-4xl font-black text-yellow-300 mb-2">
                  {prediction.prediction}
                </div>
                {prediction.confidence && (
                  <div className="text-white/80 text-sm">
                    Confidence: <span className="text-yellow-300 font-bold">{prediction.confidence}%</span>
                  </div>
                )}
              </div>
            )}

            {/* Recent Results */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white font-medium mb-3 text-left">Recent Results</div>
              <div className="grid grid-cols-5 gap-2">
                {results.slice(0, 10).map((result, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg border ${getNumberBg(result.number)}`}
                  >
                    <div className={`text-lg font-bold ${getNumberColor(result.number)}`}>
                      {result.number}
                    </div>
                    <div className={`text-xs ${getNumberColor(result.number)}`}>
                      {getBigSmall(result.number)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => navigate(`/wingo-${selectedVariant}`)}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg"
            >
              Play {variants.find(v => v.key === selectedVariant)?.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}