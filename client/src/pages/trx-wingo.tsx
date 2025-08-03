import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Trophy, Target } from "lucide-react";
import { useLocation } from "wouter";

export default function TrxWingo() {
  const [, navigate] = useLocation();
  const [activeGame, setActiveGame] = useState<string>("");

  const gameVariants = [
    { id: "30sec", name: "TrxWingo 30Sec", time: "0:30", route: "/trx-wingo-30sec" },
    { id: "1min", name: "TrxWingo 1Min", time: "1:00", route: "/trx-wingo-1min" },
    { id: "3min", name: "TrxWingo 3Min", time: "3:00", route: "/trx-wingo-3min" },
    { id: "5min", name: "TrxWingo 5Min", time: "5:00", route: "/trx-wingo-5min" },
  ];

  const handleGameSelect = (route: string, gameId: string) => {
    setActiveGame(gameId);
    setTimeout(() => {
      navigate(route);
    }, 150);
  };

  return (
    <div className="min-h-screen pb-6" style={{ backgroundColor: '#231C21' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-banner-gradient border-b-2 border-accent-gold/30 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Button>
          <h1 className="text-xl font-bold light-gold">TRX Wingo Games</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        
        {/* Game Description */}
        <Card className="bg-banner-gradient border-accent-gold/30 p-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FED358' }}>
                <Trophy className="w-6 h-6 text-black" />
              </div>
            </div>
            <h2 className="text-lg font-bold light-gold">TRX Wingo Predictions</h2>
            <p className="text-sm warm-gold">
              Select your preferred time interval for TRX-based Wingo predictions. Each variant offers unique timing and prediction opportunities.
            </p>
          </div>
        </Card>

        {/* Game Variants */}
        <div className="space-y-3">
          <h3 className="text-base font-bold light-gold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Choose Your Game
          </h3>
          
          {gameVariants.map((variant) => (
            <Card 
              key={variant.id}
              className={`bg-banner-gradient border-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
                activeGame === variant.id 
                  ? 'border-accent-gold scale-[1.02] shadow-lg' 
                  : 'border-accent-gold/30 hover:border-accent-gold/60'
              }`}
              onClick={() => handleGameSelect(variant.route, variant.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#FED358' }}>
                      <Clock className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold light-gold text-sm">{variant.name}</h4>
                      <p className="text-xs warm-gold">Interval: {variant.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs accent-gold font-semibold">TRX Network</div>
                    <div className="text-xs warm-gold">Live Predictions</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <Card className="bg-banner-gradient border-accent-gold/30 p-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold light-gold flex items-center gap-2">
              <Users className="w-4 h-4" />
              TRX Wingo Features
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FED358' }}></div>
                <span className="warm-gold">TRX Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FED358' }}></div>
                <span className="warm-gold">Live Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FED358' }}></div>
                <span className="warm-gold">Real-time Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FED358' }}></div>
                <span className="warm-gold">High Accuracy</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="bg-banner-gradient border-accent-gold/30 p-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold light-gold">How to Play</h3>
            <div className="space-y-2 text-xs warm-gold">
              <div className="flex gap-2">
                <span className="text-accent-gold font-bold">1.</span>
                <span>Select your preferred time interval</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent-gold font-bold">2.</span>
                <span>View live predictions and analysis</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent-gold font-bold">3.</span>
                <span>Monitor results and track performance</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}