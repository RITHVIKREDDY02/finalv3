import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Trophy, Clock, TrendingUp, Eye, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
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
  predictedNumber: number;
  confidence: number;
  countdown: number;
}

export default function Wingo() {
  const [, navigate] = useLocation();
  const [selectedVariant, setSelectedVariant] = useState<WingoVariant>("30sec");
  const [countdown, setCountdown] = useState(30);

  // Fetch prediction data for selected variant
  const { data: prediction } = useQuery<WingoPrediction>({
    queryKey: [`/api/wingo/prediction/${selectedVariant}`],
    refetchInterval: 10000, // Faster refresh
    staleTime: 5000, // Consider data stale after 5 seconds
    enabled: !!selectedVariant,
  });

  // Fetch results data for selected variant
  const { data: results = [] } = useQuery<WingoResult[]>({
    queryKey: [`/api/wingo/results/${selectedVariant}`],
    refetchInterval: 15000,
    enabled: !!selectedVariant,
  });

  // Synchronized countdown timer with server
  useEffect(() => {
    // Always sync with server countdown when prediction updates
    if (prediction?.countdown !== undefined) {
      setCountdown(prediction.countdown);
    }
  }, [prediction?.countdown]);

  // Local countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        const newCount = prev - 1;
        // If countdown would go to 0 or below, keep it at 1 until server updates
        return newCount <= 0 ? 1 : newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const variants = [
    { key: "30sec" as WingoVariant, label: "30Sec" },
    { key: "1min" as WingoVariant, label: "1Min" },
    { key: "3min" as WingoVariant, label: "3Min" },
    { key: "5min" as WingoVariant, label: "5Min" },
  ];

  const handleVariantSwitch = (variant: WingoVariant) => {
    setSelectedVariant(variant);
    
    // Set initial countdown based on variant
    const countdowns = { "30sec": 30, "1min": 60, "3min": 180, "5min": 300 };
    setCountdown(countdowns[variant]);
    
    // Invalidate queries for new variant to fetch fresh data
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/prediction/${variant}`] });
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/results/${variant}`] });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBigSmall = (number: number): "BIG" | "SMALL" => {
    return number >= 5 ? "BIG" : "SMALL";
  };

  const formatDateTime = (): string => {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleVariantNavigation = (variant: WingoVariant) => {
    const routes = {
      "30sec": "/wingo/30sec",
      "1min": "/wingo/1min", 
      "3min": "/wingo/3min",
      "5min": "/wingo/5min"
    };
    navigate(routes[variant]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between shadow-lg">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-white">WINGO GAMES</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: [`/api/wingo/prediction/${selectedVariant}`] });
              queryClient.invalidateQueries({ queryKey: [`/api/wingo/results/${selectedVariant}`] });
            }}
            className="flex items-center justify-center w-10 h-10 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-gray-700"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start pt-6">
        <div className="w-[448px] h-[402px] mx-0">
          {/* Tab Navigation */}
          <div style={{ backgroundColor: '#382e35', borderRadius: '16px', padding: '8px' }}>
            <div className="flex gap-1">
              {variants.map((variant) => (
                <button
                  key={variant.key}
                  onClick={() => handleVariantSwitch(variant.key)}
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
                  <div className="text-white font-bold text-xl">
                    {prediction?.predictedNumber !== undefined ? prediction.predictedNumber : "?"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Results Section */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              <h3 className="text-white font-bold text-lg">Recent Results</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex justify-center gap-2 overflow-x-auto">
                {results.slice(0, 5).map((result, index) => {
                  const size = getBigSmall(result.number);
                  return (
                    <div
                      key={result.issueNumber}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-lg ${
                        size === 'BIG' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {result.number}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => handleVariantNavigation(selectedVariant)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Play {variants.find(v => v.key === selectedVariant)?.label}
            </Button>
          </div>

          {/* Live Clock */}
          <div className="mt-4 text-center">
            <div className="text-gray-400 text-sm">
              IST: {formatDateTime()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}