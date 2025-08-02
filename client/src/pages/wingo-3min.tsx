import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";

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

export default function Wingo3Min() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(180);
  // Fetch prediction data
  const { data: prediction } = useQuery<WingoPrediction>({
    queryKey: [`/api/wingo/prediction/3min`],
    refetchInterval: 180000, // Refetch every 3 minutes
  });

  // Fetch results data  
  const { data: results = [] } = useQuery<WingoResult[]>({
    queryKey: [`/api/wingo/results/3min`],
    refetchInterval: 60000, // Refetch every minute
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

  const userIds = [
    "2643211", "3077777", "2525003", "2955005", "2977770", "2834000", "2521120", "2966006", 
    "2756789", "2677722", "2701203", "2830901", "2530491", "3010000", "3060808", "3099999", 
    "3088888", "3243210", "2890001", "3045678", "2999999", "3113123", "3130000", "3288888", 
    "2741112", "3250000", "3211000", "2922222", "3111000", "3123123", "2849081", "2940101", 
    "2733333", "2667722", "2601000", "2800123", "2720000", "2863456", "2689100", "2911001", 
    "3276543", "3050005", "2903452", "2825678", "2741112", "3222222", "3234567", "2988881", 
    "2760001", "2879000", "2583021", "3301234", "3156789", "2900001", "2712205", "3200000", 
    "2825678", "3178888", "3045678", "2701203", "3288888", "3211000", "3010000", "3111000", 
    "3344444", "3088888", "3265432", "2999999", "2521120"
  ];

  const maskUserId = (userId: string): string => {
    if (userId.length >= 4) {
      const first2 = userId.substring(0, 2);
      const last2 = userId.substring(userId.length - 2);
      const middle = 'x'.repeat(userId.length - 4);
      return `${first2}${middle}${last2}`;
    }
    return userId;
  };

  const getUserParticipation = (): string[] => {
    // Show only 4 random users that have "joined" the current prediction
    const shuffled = [...userIds].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };


  return (
    <div className="min-h-screen" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div 
        className="py-4 border-b border-gray-700 flex items-center justify-between" 
        style={{ paddingLeft: 'max(32px, 5vw)', paddingRight: 'max(32px, 5vw)' }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-bold text-white">Wingo 3Min</h1>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['/api/wingo/prediction/3min'] });
            queryClient.invalidateQueries({ queryKey: ['/api/wingo/results/3min'] });
            
          }}
          className="flex items-center justify-center w-10 h-10 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-gray-700"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div 
        className="space-y-4" 
        style={{ padding: 'max(32px, 5vw)' }}
      >
        {/* Current Prediction Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2" style={{ borderColor: '#FED358' }}>
          <div className="p-4 text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                🏆 TASHAN-WIN WINGO 3MIN 🏆
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              <div className="text-gray-300 text-lg">
                🔓 <span className="font-bold">PERIOD ID</span> - {prediction?.period || "Loading..."}
              </div>
              
              <div className="flex gap-4 justify-center items-center">
                <div 
                  className="text-4xl font-black tracking-wider py-4 px-6 rounded-xl border-2 bg-black/20 shadow-lg"
                  style={{ 
                    color: '#FED358',
                    borderColor: '#FED358',
                    textShadow: '0 0 20px rgba(254, 211, 88, 0.5)'
                  }}
                >
                  {prediction?.prediction || "LOADING"}
                </div>
                <div className="text-gray-400 text-2xl font-bold">+</div>
                <div 
                  className="text-6xl font-black tracking-wider py-4 px-6 rounded-xl border-2 bg-black/20 shadow-lg w-24 h-24 flex items-center justify-center"
                  style={{ 
                    color: '#FED358',
                    borderColor: '#FED358',
                    textShadow: '0 0 20px rgba(254, 211, 88, 0.5)'
                  }}
                >
                  {prediction?.predictedNumber ?? "?"}
                </div>
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
              <p>⚡ Real-time predictions updated every 3 minutes</p>
              <p>💰 Higher accuracy with advanced trend analysis</p>
            </div>
          </div>
        </Card>

        {/* Live Players Section */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              👥 Live Players
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-2 text-center">
              {getUserParticipation().map((userId, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  <span className="text-yellow-400">{maskUserId(userId)}</span> has joined{' '}
                  <span className={`font-bold ${prediction?.prediction === 'BIG' ? 'text-green-400' : 'text-red-400'}`}>
                    {prediction?.prediction || 'BIG'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}