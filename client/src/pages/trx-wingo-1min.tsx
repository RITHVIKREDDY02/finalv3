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

export default function TrxWingo1Min() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(60);
  
  // Fetch prediction data - using Wingo API for TRX Wingo
  const { data: prediction } = useQuery<TrxWingoPrediction>({
    queryKey: [`/api/wingo/prediction/1min`],
    refetchInterval: 10000, // Refetch every 10 seconds for faster updates
    staleTime: 5000, // Consider data stale after 5 seconds
  });

  // Fetch results data  
  const { data: results = [] } = useQuery<TrxWingoResult[]>({
    queryKey: [`/api/wingo/results/1min`],
    refetchInterval: 15000, // Refetch every 15 seconds for faster updates
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  // Synchronized countdown timer with server
  useEffect(() => {
    // Always sync with server countdown when prediction updates
    if (prediction?.countdown !== undefined) {
      setCountdown(prediction.countdown);
    }
  }, [prediction]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        const newValue = prev - 1;
        // If countdown would go to 0 or below, keep it at 1 until server updates
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentISTTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getColorFromNumber = (number: number): string => {
    if (number === 0) return "#FF6B6B"; // Red for 0
    if ([1, 3, 7, 9].includes(number)) return "#4ECDC4"; // Green for 1,3,7,9
    if ([2, 4, 6, 8].includes(number)) return "#FF6B6B"; // Red for 2,4,6,8
    if (number === 5) return "#8B5CF6"; // Purple for 5
    return "#FED358"; // Gold default
  };

  const getNumberColorClass = (number: number): string => {
    if (number === 0) return "text-red-400"; // Red for 0
    if ([1, 3, 7, 9].includes(number)) return "text-green-400"; // Green for 1,3,7,9
    if ([2, 4, 6, 8].includes(number)) return "text-red-400"; // Red for 2,4,6,8
    if (number === 5) return "text-purple-400"; // Purple for 5
    return "text-yellow-400"; // Gold default
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/prediction/1min`] });
    queryClient.invalidateQueries({ queryKey: [`/api/wingo/results/1min`] });
  };

  // Mock users for live players section
  const mockUsers = [
    "87***45", "92***18", "65***73", "43***29"
  ];

  return (
    <div className="min-h-screen pb-6" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-banner-gradient border-b-2 border-accent-gold/30 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/trx-wingo')}
            className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back</span>
          </Button>
          <h1 className="text-lg font-bold light-gold">TrxWingo 1Min</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Issue Number and Countdown */}
        <div className="text-center space-y-2 max-w-md mx-auto">
          <div className="text-xs warm-gold">Issue Number</div>
          <div className="text-sm font-bold light-gold">{prediction?.period || "Loading..."}</div>
          <div className="text-xs warm-gold">Next Round In</div>
          <div className="text-lg font-bold text-red-400">{formatTime(countdown)}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        
        {/* Current Prediction */}
        {prediction && (
          <Card className="bg-banner-gradient border-2 border-accent-gold p-4">
            <div className="text-center space-y-3">
              <div className="text-sm warm-gold">Period: {prediction.period}</div>
              <div className="space-y-2">
                <div className="text-xs warm-gold">Our Prediction</div>
                <div className="flex items-center justify-center gap-4">
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    prediction.prediction === "BIG" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                  }`}>
                    {prediction.prediction}
                  </div>
                  <div className="text-xl font-bold light-gold">{prediction.predictedNumber}</div>
                </div>
                <div className="text-xs accent-gold">Confidence: {prediction.confidence}%</div>
              </div>
            </div>
          </Card>
        )}

        {/* Live Players */}
        <Card className="bg-banner-gradient border-accent-gold/30 p-3">
          <div className="space-y-2">
            <div className="text-xs font-bold light-gold text-center">Live Players</div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {mockUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="warm-gold">{user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Game History */}
        <Card className="bg-banner-gradient border-accent-gold/30">
          <div className="p-3 border-b border-accent-gold/30">
            <div className="text-sm font-bold light-gold text-center">Game History</div>
          </div>
          <div className="p-3 space-y-2">
            {results.length > 0 ? results.slice(0, 10).map((result, index) => (
              <div key={result.issueNumber} className="flex items-center justify-between text-xs" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                <div className="p-2 rounded flex-1">
                  <div className="flex justify-between items-center">
                    <span className="warm-gold">#{result.issueNumber}</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: getColorFromNumber(result.number) }}
                      >
                        {result.number}
                      </div>
                      <span className={`font-bold ${getBigSmall(result.number) === "BIG" ? "text-green-400" : "text-red-400"}`}>
                        {getBigSmall(result.number)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-xs warm-gold py-4">Loading results...</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}