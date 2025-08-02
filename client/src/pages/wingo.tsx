import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play } from "lucide-react";
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
    { key: "30sec" as WingoVariant, label: "WinGo", sublabel: "30sec", active: true },
    { key: "1min" as WingoVariant, label: "WinGo 1", sublabel: "Min", active: false },
    { key: "3min" as WingoVariant, label: "WinGo 3", sublabel: "Min", active: false },
    { key: "5min" as WingoVariant, label: "WinGo 5", sublabel: "Min", active: false }
  ];

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

      <div className="p-4 space-y-6">
        {/* Game Selection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {variants.map((variant) => (
            <button
              key={variant.key}
              onClick={() => setSelectedVariant(variant.key)}
              className={`p-4 rounded-xl transition-all duration-200 ${
                selectedVariant === variant.key
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-lg scale-105'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedVariant === variant.key ? 'bg-black/20' : 'bg-gray-500'
                }`}>
                  <Play className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm">{variant.label}</div>
                  <div className="text-xs opacity-75">{variant.sublabel}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Game Display */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-black">
          {/* How to Play Button */}
          <div className="mb-4">
            <button className="bg-black/20 text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Play className="w-4 h-4" />
              How to play
            </button>
          </div>

          <div className="flex justify-between items-start mb-6">
            {/* Game Info */}
            <div>
              <h2 className="text-xl font-bold mb-2">
                WinGo {selectedVariant === "30sec" ? "30sec" : selectedVariant === "1min" ? "1 Min" : selectedVariant === "3min" ? "3 Min" : "5 Min"}
              </h2>
              
              {/* Recent Results */}
              <div className="flex gap-2 mb-4">
                {results.slice(0, 5).map((result, index) => (
                  <div
                    key={result.issueNumber}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      getBigSmall(result.number) === 'BIG' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                  >
                    {result.number}
                  </div>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-right">
              <div className="text-sm font-medium mb-1">Time remaining</div>
              <div className="text-3xl font-bold font-mono">
                {formatTime(countdown)}
              </div>
            </div>
          </div>

          {/* Period ID */}
          <div className="text-center">
            <div className="text-lg font-mono font-bold">
              {prediction?.period || "Loading..."}
            </div>
          </div>
        </div>

        {/* Prediction Display */}
        {prediction && (
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2" style={{ borderColor: '#FED358' }}>
            <div className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">VIP PREDICTION</h3>
              <div 
                className="text-4xl font-black py-4 px-6 rounded-xl border-2 bg-black/20"
                style={{ 
                  color: '#FED358',
                  borderColor: '#FED358',
                  textShadow: '0 0 20px rgba(254, 211, 88, 0.5)'
                }}
              >
                {prediction.prediction}
              </div>
              <div className="text-sm text-gray-400">
                Confidence: <span style={{ color: '#FED358' }}>{prediction.confidence}%</span>
              </div>
              <Button 
                className="w-full text-black font-bold py-3 hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: '#FED358' }}
                onClick={() => window.open('https://www.tashanwin.in/#/', '_blank')}
              >
                Play Now - TASHAN WIN
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}