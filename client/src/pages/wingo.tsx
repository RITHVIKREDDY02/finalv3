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
        </div>
      </div>
    </div>
  );
}