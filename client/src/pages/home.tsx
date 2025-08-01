import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/TASHAN WIN LOGO_1754052537792.png";
import winGoImage from "@assets/lotterycategory_20250412120719dqfv_1754052547793.png";
import trxWingoImage from "@assets/lotterycategory_20250412120818j8wq_1754052552269.png";
import k3Image from "@assets/lotterycategory_2025041212074073ug_1754069351570.png";
import motoRacingImage from "@assets/c57f5149-2139-410f-8d48-94a06fcb36f2_1754069356497.png";
import lotteryIcon from "@assets/Lottery-9123e8d2_1754069546644.webp";
import miniGameIcon from "@assets/MiniGame-a7def346_1754070684724.webp";
import minesProImage from "@assets/811_1754070860593.png";
import minesImage from "@assets/229 (1)_1754070860598.png";
import boomImage from "@assets/100_1754070860600.png";
import aviatorImage from "@assets/800_1754070860600.png";
import limboImage from "@assets/235_1754071157602.png";

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
      <div className="max-w-2xl mx-auto px-6 md:px-8 lg:mx-0 lg:ml-8 xl:ml-12 lg:px-4 py-6">
        {/* Section Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            {/* Vertical accent line */}
            <div 
              className="w-1 h-8 mr-3 rounded-full accent-shadow"
              style={{ backgroundColor: '#FED358' }}
            ></div>
            <img 
              src={lotteryIcon} 
              alt="Lottery icon" 
              className="w-6 h-6 mr-2"
            />
            <span className="font-bold" style={{ color: '#FDE4BC', fontSize: '24px' }}>Lottery</span>
          </div>
        </div>

        {/* Game Categories */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-4 gap-y-6 md:gap-x-12 md:gap-y-8 lg:gap-x-8 lg:gap-y-8 xl:gap-x-6 xl:gap-y-8">
          
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

        {/* Mini Game Section Header */}
        <div className="flex items-center mb-6 mt-12">
          <div className="flex items-center">
            {/* Vertical accent line */}
            <div 
              className="w-1 h-8 mr-3 rounded-full accent-shadow"
              style={{ backgroundColor: '#FED358' }}
            ></div>
            <img 
              src={miniGameIcon} 
              alt="Mini Game icon" 
              className="w-6 h-6 mr-2"
            />
            <span className="font-bold" style={{ color: '#FDE4BC', fontSize: '24px' }}>Mini Game</span>
          </div>
        </div>

        {/* Mini Game Categories */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-6 lg:gap-x-4 lg:gap-y-6 xl:gap-x-4 xl:gap-y-6">
          
          {/* Mines Pro Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Mines Pro')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={minesProImage} 
                alt="Mines Pro - Explosive mine field game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Mines Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Mines')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={minesImage} 
                alt="Mines - Classic mine sweeping game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Boom Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Boom')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={boomImage} 
                alt="Boom - Explosive chain reaction game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Aviator Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Aviator')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={aviatorImage} 
                alt="Aviator - High-flying multiplier game" 
                className="w-full h-auto object-cover object-top block"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-accent-gold/30"></div>
            </div>
          </div>

          {/* Limbo Game Card */}
          <div 
            className="cursor-pointer shadow-lg relative"
            onClick={() => handleGameClick('Limbo')}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={limboImage} 
                alt="Limbo - Rocket launch multiplier game" 
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

      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/tashanwinvi" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:scale-110"
      >
        <FaTelegram className="text-white text-2xl" />
      </a>
    </div>
  );
}
