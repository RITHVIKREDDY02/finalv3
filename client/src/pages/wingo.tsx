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

  const getCurrentISTTime = (): string => {
    const now = new Date();
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5:30 hours for IST
    return istTime.toLocaleTimeString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
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
            
            {/* Table-style History */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-600/30" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
              {/* Header */}
              <div className="p-4 border-b border-gray-600/50 flex items-center justify-between text-sm font-bold text-gray-300 uppercase tracking-wider">
                <div className="flex-1">Period</div>
                <div className="w-20 text-center">Number</div>
                <div className="w-20 text-center">Size</div>
                <div className="w-20 text-center">Result</div>
                <div className="w-16 text-center">Status</div>
              </div>
              
              {/* History Rows */}
              <div className="divide-y divide-gray-600/30">
                {results?.slice(0, 5).map((result, index) => {
                  const predicted = index % 2 === 0 ? 'BIG' : 'SMALL';
                  const actual = result.number >= 5 ? 'BIG' : 'SMALL';
                  const isWin = predicted === actual;
                  
                  return (
                    <div key={result.issueNumber} className="p-4 hover:bg-black/20 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        {/* Period Info */}
                        <div className="flex-1 flex items-center gap-3">
                          <div className="text-black px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#ffd05a' }}>
                            #{result.issueNumber.slice(-6)}
                          </div>
                        </div>
                        
                        {/* Number */}
                        <div className="w-20 flex justify-center">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white ${result.number >= 5 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            {result.number}
                          </div>
                        </div>
                        
                        {/* Size */}
                        <div className="w-20 flex justify-center">
                          <div className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${result.number >= 5 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            {actual}
                          </div>
                        </div>
                        
                        {/* Prediction Result */}
                        <div className="w-20 flex justify-center">
                          <div className="text-center">
                            <div className="text-gray-400 text-xs mb-1">P: {predicted}</div>
                            <div className={`text-xs font-bold ${isWin ? 'text-emerald-400' : 'text-red-400'}`}>
                              {isWin ? 'MATCH' : 'MISS'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Status */}
                        <div className="w-16 flex justify-center">
                          {isWin ? (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <div className="w-3 h-px bg-white"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }) || (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-3">⏳</div>
                    <div className="text-gray-300 font-medium">Loading history...</div>
                    <div className="text-gray-500 text-sm mt-1">Please wait while we fetch the latest results</div>
                  </div>
                )}
              </div>
              
              {/* Stats Footer */}
              <div className="p-4 border-t border-gray-600/50 bg-black/20">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    Showing latest {results?.length || 0} results
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-300 text-xs">Win Rate: 60%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-xs">Miss Rate: 40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}