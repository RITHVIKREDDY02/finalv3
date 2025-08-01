import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import logoPath from "@assets/TASHAN WIN LOGO_1754052537792.png";
import winGoImage from "@assets/lotterycategory_20250412120719dqfv_1754052547793.png";
import trxWingoImage from "@assets/lotterycategory_20250412120818j8wq_1754052552269.png";
import k3Image from "@assets/lotterycategory_2025041212074073ug_1754069351570.png";
import motoRacingImage from "@assets/c57f5149-2139-410f-8d48-94a06fcb36f2_1754069356497.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGameClick = (gameType: string) => {
    console.log(`${gameType} game selected`);
    // TODO: Implement navigation to game sections
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="navbar-dark px-4 shadow-lg" style={{ height: '60px' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center logo-spacing-mobile md:logo-spacing-tablet lg:logo-spacing-desktop">
            <img 
              src={logoPath} 
              alt="TASHANWIN Logo" 
              className="w-auto object-contain"
              style={{ height: '60px' }}
            />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              className="px-3 py-1.5 rounded-full text-black font-bold text-xs transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#FFB472' }}
              onClick={() => console.log('Join VIP clicked')}
            >
              JOIN VIP
            </button>
            <button 
              className="light-gold hover:warm-gold transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="px-4 py-2 rounded-full text-black font-bold text-sm transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#FFB472' }}
              onClick={() => console.log('Join VIP clicked')}
            >
              JOIN VIP
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Banner - Full Width */}
      <div style={{ padding: '24px 34px' }}>
        <Card className="bg-banner-gradient rounded-lg py-1 px-3 mb-8 border-2 border-accent-gold shadow-lg w-full mx-auto">
          <div className="flex items-center space-x-3 overflow-hidden">
            {/* Speaker Icon */}
            <div className="flex-shrink-0">
              <Volume2 className="w-4 h-4 warm-gold" />
            </div>
            
            {/* Marquee Text Container */}
            <div className="flex-1 overflow-hidden">
              <div className="marquee-container">
                <p className="light-gold text-sm font-medium whitespace-nowrap animate-marquee">
                  Welcome to TASHANWIN VIP PREDICTION APP, we will serve you Special Predictions!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-4 py-6">
        {/* Game Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-8 xl:gap-6">
          
          {/* Win Go Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Win Go')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={winGoImage} 
                alt="Win Go - Lottery prediction game with colorful balls" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Trx Wingo Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Trx Wingo')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={trxWingoImage} 
                alt="Trx Wingo - TRX-themed lottery prediction game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* K3 Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('K3')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={k3Image} 
                alt="K3 - Dice prediction game with golden dice" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Moto Racing Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Moto Racing')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={motoRacingImage} 
                alt="Moto Racing - Motorcycle racing prediction game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

        </div>

        {/* Feature Section */}
        <div className="mt-12 text-center">
          <div className="text-opacity-70 light-gold text-sm">
            <p>More exciting features coming soon...</p>
          </div>
        </div>

      </div>
    </div>
  );
}
