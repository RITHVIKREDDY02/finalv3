import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

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

export default function Wingo5Min() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(300);

  // Fetch prediction data
  const { data: prediction } = useQuery<WingoPrediction>({
    queryKey: [`/api/wingo/prediction/5min`],
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // Fetch results data  
  const { data: results = [] } = useQuery<WingoResult[]>({
    queryKey: [`/api/wingo/results/5min`],
    refetchInterval: 60000, // Refetch every minute
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          return 300;
        }
        return prev - 1;
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
        <h1 className="text-xl font-bold text-white">Wingo 5Min</h1>
        <div className="w-16"></div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Current Prediction Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2" style={{ borderColor: '#FED358' }}>
          <div className="p-6 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                🏆 TASHAN-WIN WINGO 5MIN 🏆
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              <div className="text-gray-300 text-lg">
                🔓 <span className="font-bold">PERIOD ID</span> - {prediction?.period || "Loading..."}
              </div>
              
              <div 
                className="text-5xl font-black tracking-wider py-4 px-6 rounded-xl border-2 bg-black/20 shadow-lg"
                style={{ 
                  color: '#FED358',
                  borderColor: '#FED358',
                  textShadow: '0 0 20px rgba(254, 211, 88, 0.5)'
                }}
              >
                {prediction?.prediction || "LOADING"}
              </div>
              
              <div className="text-gray-300 text-lg">
                ⏰ Next prediction in: <span className="font-bold text-white text-xl">{formatTime(countdown)}</span>
              </div>

              {prediction?.confidence && (
                <div className="text-sm text-gray-400">
                  Confidence: <span style={{ color: '#FED358' }}>{prediction.confidence}%</span>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                className="w-full text-black font-bold text-lg py-4 hover:opacity-90 transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#FED358' }}
                onClick={() => window.open('https://www.tashanwin.in/#/', '_blank')}
              >
                🎮 Play Now - TASHAN WIN 🎮
              </Button>
              
              <div className="text-xs text-gray-400 italic">
                Game Link: <span className="text-blue-400">https://www.tashanwin.in/#/</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Results */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 rounded-full" style={{ backgroundColor: '#ffd05a' }}></div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                📊 Recent Results
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {results.length > 0 ? results.map((result, index) => (
              <div key={result.issueNumber} className="rounded-xl p-4 border border-gray-600/30 hover:border-yellow-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="text-black px-3 py-1 rounded-full text-xs font-bold shadow-md" style={{ backgroundColor: '#ffd05a' }}>
                      #{result.issueNumber.slice(-6)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm font-medium">Period: {result.issueNumber}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border-2 ${result.number >= 5 ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400'}`}>
                      {result.number}
                    </div>
                    <div 
                      className="px-4 py-2 rounded-xl text-xs font-bold min-w-[70px] text-center shadow-lg text-white border-2"
                      style={{ 
                        backgroundColor: getBigSmall(result.number) === 'BIG' ? '#ef4444' : '#22c55e',
                        borderColor: getBigSmall(result.number) === 'BIG' ? '#dc2626' : '#16a34a'
                      }}
                    >
                      {getBigSmall(result.number)}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 rounded-xl shadow-lg border border-gray-600/30" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                <div className="text-4xl mb-3">⏳</div>
                <div className="text-gray-300 font-medium">Loading results...</div>
                <div className="text-gray-500 text-sm mt-1">Please wait while we fetch the latest results</div>
              </div>
            )}
          </div>
        </Card>

        {/* Game Instructions */}
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
            
            <div className="space-y-2 text-gray-300 text-sm bg-black/30 p-3 rounded-lg">
              <p>🎯 Predict the next number range</p>
              <p>📈 Win rate: 90%+ with our VIP predictions</p>
              <p>⚡ Real-time predictions updated every 5 minutes</p>
              <p>💰 Higher accuracy with advanced trend analysis</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}