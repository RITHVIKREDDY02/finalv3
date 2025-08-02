import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  // Fetch prediction history with win/loss tracking
  const { data: history = [] } = useQuery<any[]>({
    queryKey: [`/api/wingo/history/3min`],
    refetchInterval: 15000, // Refetch every 15 seconds
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

  // Clear history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/wingo/history/3min', 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wingo/history/3min'] });
      toast({
        title: "History Cleared",
        description: "Game history has been reset. Starting fresh!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear history. Please try again.",
        variant: "destructive",
      });
    }
  });

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
        <h1 className="text-xl font-bold text-white">Wingo 3Min</h1>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['/api/wingo/prediction/3min'] });
            queryClient.invalidateQueries({ queryKey: ['/api/wingo/results/3min'] });
            queryClient.invalidateQueries({ queryKey: ['/api/wingo/history/3min'] });
          }}
          className="flex items-center justify-center w-10 h-10 text-white hover:text-yellow-400 transition-colors rounded-lg hover:bg-gray-700"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Current Prediction Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-2" style={{ borderColor: '#FED358' }}>
          <div className="p-6 text-center space-y-6">
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

        {/* Game History - Predictions vs Results */}
        <Card className="bg-gray-800 border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 rounded-full" style={{ backgroundColor: '#ffd05a' }}></div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  📊 Game History (Predictions vs Results)
                </h3>
              </div>
              <Button
                onClick={() => clearHistoryMutation.mutate()}
                disabled={clearHistoryMutation.isPending || history.length === 0}
                variant="outline"
                size="sm"
                className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {clearHistoryMutation.isPending ? 'Clearing...' : 'Start Fresh'}
              </Button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {history.length > 0 ? history.map((record, index) => (
              <div key={record.id} className="rounded-xl p-4 border border-gray-600/30 hover:border-yellow-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                <div className="space-y-3">
                  {/* Period */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Period:</span>
                    <span className="text-white font-medium">#{record.period.slice(-6)}</span>
                  </div>
                  
                  {/* Predicted Number */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Number (Predicted):</span>
                    <div className={`text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border-2 ${record.predictedSize === 'BIG' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'}`}>
                      {record.predictedNumber}
                    </div>
                  </div>

                  {/* Predicted Size */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Size (Predicted):</span>
                    <div 
                      className="px-3 py-1 rounded-lg text-xs font-bold min-w-[60px] text-center shadow-lg text-white border-2"
                      style={{ 
                        backgroundColor: record.predictedSize === 'BIG' ? '#ef4444' : '#22c55e',
                        borderColor: record.predictedSize === 'BIG' ? '#dc2626' : '#16a34a'
                      }}
                    >
                      {record.predictedSize}
                    </div>
                  </div>

                  {/* Actual Result */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Result (Actual):</span>
                    <div className="flex items-center gap-2">
                      {record.actualNumber !== null ? (
                        <>
                          <div className={`text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border-2 ${record.actualSize === 'BIG' ? 'bg-green-500 border-green-400' : 'bg-red-500 border-red-400'}`}>
                            {record.actualNumber}
                          </div>
                          <div 
                            className="px-3 py-1 rounded-lg text-xs font-bold min-w-[60px] text-center shadow-lg text-white border-2"
                            style={{ 
                              backgroundColor: record.actualSize === 'BIG' ? '#ef4444' : '#22c55e',
                              borderColor: record.actualSize === 'BIG' ? '#dc2626' : '#16a34a'
                            }}
                          >
                            {record.actualSize}
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">Pending...</span>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-600/30">
                    <span className="text-gray-300 text-sm">Status:</span>
                    <div className="flex items-center gap-2">
                      {record.status === 'WIN' && (
                        <div className="px-4 py-1 rounded-full text-xs font-bold text-white bg-green-500 border-2 border-green-400 shadow-lg">
                          🎉 WIN
                        </div>
                      )}
                      {record.status === 'LOSS' && (
                        <div className="px-4 py-1 rounded-full text-xs font-bold text-white bg-red-500 border-2 border-red-400 shadow-lg">
                          ❌ LOSS
                        </div>
                      )}
                      {record.status === 'PENDING' && (
                        <div className="px-4 py-1 rounded-full text-xs font-bold text-white bg-gray-500 border-2 border-gray-400 shadow-lg">
                          ⏳ PENDING
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 rounded-xl shadow-lg border border-gray-600/30" style={{ backgroundColor: 'rgb(56, 46, 53)' }}>
                <div className="text-4xl mb-3">📊</div>
                <div className="text-gray-300 font-medium">No game history yet</div>
                <div className="text-gray-500 text-sm mt-1">Predictions will appear here once the system generates them</div>
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
              <p>⚡ Real-time predictions updated every 3 minutes</p>
              <p>💰 Higher accuracy with advanced trend analysis</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}