import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
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
  const [activeVariant, setActiveVariant] = useState<WingoVariant>("1min");
  const [countdown, setCountdown] = useState(45);

  // Fetch prediction data
  const { data: prediction } = useQuery<WingoPrediction>({
    queryKey: [`/api/wingo/prediction/${activeVariant}`],
    refetchInterval: 60000, // Refetch every minute
  });

  // Fetch results data
  const { data: results = [] } = useQuery<WingoResult[]>({
    queryKey: [`/api/wingo/results/${activeVariant}`],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          const seconds = getIntervalSeconds(activeVariant);
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeVariant]);

  const getIntervalSeconds = (variant: WingoVariant): number => {
    switch (variant) {
      case "30sec": return 30;
      case "1min": return 60;
      case "3min": return 180;
      case "5min": return 300;
      default: return 60;
    }
  };

  const getBigSmall = (number: number): "BIG" | "SMALL" => {
    return number >= 5 ? "BIG" : "SMALL";
  };

  const variants: Array<{key: WingoVariant, label: string}> = [
    { key: "30sec", label: "Parity" },
    { key: "1min", label: "Sapre" },
    { key: "3min", label: "Bcone" },
    { key: "5min", label: "Emerd" }
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
        <h1 className="text-xl font-bold text-white">WINGO PREDICTION</h1>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      {/* Variant Navigation Tabs */}
      <div className="p-4">
        <div className="flex bg-white rounded-lg p-1 max-w-md mx-auto shadow-lg">
          {variants.map((variant) => (
            <button
              key={variant.key}
              onClick={() => navigate(`/wingo-${variant.key}`)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-blue-50`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="p-4 space-y-6">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2" style={{ borderColor: '#FED358' }}>
          <div className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                🏆 TASHAN-WIN WINGO 🏆
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <p className="text-gray-300 text-lg">
                Choose your preferred time variant to start predicting!
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {variants.map((variant) => (
                <button
                  key={variant.key}
                  onClick={() => navigate(`/wingo-${variant.key}`)}
                  className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                >
                  <div className="text-lg">{variant.label}</div>
                  <div className="text-sm opacity-80">{variant.key.toUpperCase()}</div>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                className="w-full max-w-md text-black font-bold text-lg py-4 hover:opacity-90 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#FED358' }}
                onClick={() => window.open('https://www.tashanwin.in/#/', '_blank')}
              >
                🎮 Play Now - TASHAN WIN 🎮
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              📋 How to Play
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-center">
                <div className="text-red-400 font-bold text-lg mb-1">BIG</div>
                <div className="text-gray-300 text-sm">Numbers: 5, 6, 7, 8, 9</div>
              </div>
              <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-center">
                <div className="text-green-400 font-bold text-lg mb-1">SMALL</div>
                <div className="text-gray-300 text-sm">Numbers: 0, 1, 2, 3, 4</div>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-300 text-sm bg-black/30 p-4 rounded-lg">
              <p className="text-center font-bold text-yellow-400 mb-2">Available Time Variants:</p>
              <div className="grid grid-cols-2 gap-2">
                <p>🔥 <span className="font-bold">Parity</span> - 30 seconds</p>
                <p>⚡ <span className="font-bold">Sapre</span> - 1 minute</p>
                <p>💎 <span className="font-bold">Bcone</span> - 3 minutes</p>
                <p>👑 <span className="font-bold">Emerd</span> - 5 minutes</p>
              </div>
              <div className="border-t border-gray-600 pt-3 mt-3">
                <p>🎯 Predict the next number range</p>
                <p>📈 Win rate: 90%+ with our VIP predictions</p>
                <p>💰 Higher accuracy with advanced trend analysis</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}