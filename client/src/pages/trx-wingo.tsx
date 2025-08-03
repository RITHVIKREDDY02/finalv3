import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";

interface TrxWingoResult {
  issueNumber: string;
  number: number;
  timestamp: number;
}

interface TrxWingoPrediction {
  period: string;
  prediction: "BIG" | "SMALL";
  predictedNumber: number;
  confidence: number;
  countdown: number;
}

export default function TrxWingo() {
  const [, navigate] = useLocation();
  const [activeVariant, setActiveVariant] = useState("30sec");
  const [countdown, setCountdown] = useState(30);

  const variants = [
    { id: "30sec", name: "TrxWingo 30Sec" },
    { id: "1min", name: "TrxWingo 1Min" },
    { id: "3min", name: "TrxWingo 3Min" },
    { id: "5min", name: "TrxWingo 5Min" },
  ];

  // Fetch prediction data using Wingo API
  const { data: prediction } = useQuery<TrxWingoPrediction>({
    queryKey: [`/api/wingo/prediction/${activeVariant}`],
    refetchInterval: 10000,
    staleTime: 5000,
  });

  // Fetch results data using Wingo API
  const { data: results = [] } = useQuery<TrxWingoResult[]>({
    queryKey: [`/api/wingo/results/${activeVariant}`],
    refetchInterval: 15000,
    staleTime: 10000,
  });

  useEffect(() => {
    if (prediction?.countdown !== undefined) {
      setCountdown(prediction.countdown);
    }
  }, [prediction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        const newValue = prev - 1;
        return newValue <= 0 ? 1 : newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBigSmall = (number: number): "BIG" | "SMALL" => {
    return number >= 5 ? "BIG" : "SMALL";
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorFromNumber = (number: number): string => {
    if (number === 0) return "#FF6B6B";
    if ([1, 3, 7, 9].includes(number)) return "#4ECDC4";
    if ([2, 4, 6, 8].includes(number)) return "#FF6B6B";
    if (number === 5) return "#8B5CF6";
    return "#FED358";
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/prediction/${activeVariant}`] });
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/results/${activeVariant}`] });
  };

  const mockUsers = [
    { id: "27***03", bet: "SMALL" },
    { id: "26***00", bet: "SMALL" },
    { id: "28***00", bet: "SMALL" },
    { id: "33***34", bet: "SMALL" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-banner-gradient border-b border-accent-gold/30 px-4 py-3">
        <div className="flex items-center justify-center max-w-md mx-auto">
          <h1 className="text-lg font-bold light-gold">TRX WINGO GAMES</h1>
        </div>
      </div>

      {/* Variant Tabs */}
      <div className="px-4 py-3 max-w-md mx-auto">
        <div className="flex bg-gray-600 rounded-lg p-1 gap-1">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant.id)}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                activeVariant === variant.id
                  ? 'bg-accent-gold text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {variant.name.replace('TrxWingo ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 max-w-md mx-auto space-y-4">
        
        {/* Current Game Info */}
        <div className="bg-accent-gold rounded-lg p-4">
          <div className="flex justify-between items-center text-black">
            <div>
              <div className="font-bold">{variants.find(v => v.id === activeVariant)?.name}</div>
              <div className="text-sm">{prediction?.period || 'Loading...'}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Time Remaining</div>
              <div className="font-bold text-lg">{formatTime(countdown)}</div>
            </div>
          </div>
        </div>

        {/* VIP Prediction */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-accent-gold"></div>
            <h3 className="font-bold light-gold">VIP Prediction</h3>
          </div>
          
          {prediction && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm warm-gold mb-1">Color</div>
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: prediction.prediction === "BIG" ? "#4ECDC4" : "#FF6B6B" }}
                  ></div>
                </div>
                <div className="text-center">
                  <div className="text-sm warm-gold mb-1">Size</div>
                  <div className="font-bold text-white text-lg">{prediction.prediction}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm warm-gold mb-1">Number</div>
                  <div className="font-bold text-white text-lg">{prediction.predictedNumber}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Players */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-accent-gold"></div>
            <h3 className="font-bold light-gold">Live Players</h3>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            {mockUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="accent-gold">{user.id}</span>
                <span className="text-gray-300">has joined</span>
                <span className={user.bet === "BIG" ? "text-green-400" : "text-red-400"}>
                  {user.bet}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}