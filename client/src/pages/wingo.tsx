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
    { key: "30sec" as WingoVariant, label: "Wingo 30Sec", sublabel: "30sec" },
    { key: "1min" as WingoVariant, label: "Wingo 1Min", sublabel: "1 Min" },
    { key: "3min" as WingoVariant, label: "Wingo 3Min", sublabel: "3 Min" },
    { key: "5min" as WingoVariant, label: "Wingo 5Min", sublabel: "5 Min" }
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

      <div className="p-4 space-y-4">
        {/* Tab Navigation */}
        <div className="bg-gray-100 rounded-2xl p-2">
          <div className="flex gap-1">
            {variants.map((variant) => (
              <button
                key={variant.key}
                onClick={() => setSelectedVariant(variant.key)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  selectedVariant === variant.key
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        {/* Game Display Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            {/* Left Side - Game Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">
                  {variants.find(v => v.key === selectedVariant)?.label} ( {variants.find(v => v.key === selectedVariant)?.sublabel} )
                </h2>
              </div>
              
              {/* Period ID */}
              <div className="text-2xl font-bold font-mono">
                {prediction?.period || "Loading..."}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-20 bg-white/30 mx-8"></div>

            {/* Right Side - Timer */}
            <div className="text-right">
              <div className="text-sm opacity-80 mb-2">Time remaining</div>
              <div className="text-4xl font-bold font-mono">
                {formatTime(countdown)}
              </div>
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