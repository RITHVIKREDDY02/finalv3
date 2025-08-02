import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTelegram } from "react-icons/fa";
import { useLocation } from "wouter";
import RegistrationDialog from "@/components/registration-dialog";
import VipPredictionDialog from "@/components/vip-prediction-dialog";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import type { GameConfig } from "@shared/schema";
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
import mobileBannerImage from "@assets/mobile hero banner_1754079113835.jpg";
import desktopBannerImage from "@assets/Hero Banner (1440 x 300 px)_1754078513162.jpg";
import proofImage1 from "@assets/image_1754150847570.png";
import proofImage2 from "@assets/image_1754150852695.png";
import demoImage1 from "@assets/Screenshot 2025-08-02 220225_1754152384208.png";
import demoImage2 from "@assets/Screenshot 2025-08-02 220234_1754152390853.png";
import demoImage3 from "@assets/Screenshot 2025-08-02 220243_1754152399399.png";
import faviconIcon from "@assets/h5setting_20250501162804ytau_1754156061703.png";

export default function Home() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showVipPredictionDialog, setShowVipPredictionDialog] = useState(false);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState<string>("");
  const [userUid, setUserUid] = useState<string>("");

  // Fetch game configurations
  const { data: gameConfigs = [] } = useQuery<GameConfig[]>({
    queryKey: ["/api/admin/games"],
  });

  // Fetch user approval status
  const { data: userStatus } = useQuery<{registered: boolean, approved: boolean, user: any}>({
    queryKey: [`/api/user/${userUid}`],
    enabled: !!userUid,
    refetchInterval: 10000, // Check every 10 seconds
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user has stored UID
    const storedUid = localStorage.getItem("tashan_user_uid");
    if (storedUid) {
      setUserUid(storedUid);
    }
  }, []);

  const isGameEnabled = (gameName: string) => {
    const config = gameConfigs.find(config => config.gameName === gameName);
    return config?.isEnabled ?? true; // Default to enabled if no config found
  };

  const handleGameClick = (gameType: string) => {
    console.log(`${gameType} game selected`);
    
    // Check if game is enabled
    if (!isGameEnabled(gameType)) {
      setSelectedGameName(gameType);
      setShowComingSoonDialog(true);
      return;
    }
    
    // Special handling for Win Go - redirect to Wingo page if approved
    if (gameType === "Win Go") {
      const storedUid = localStorage.getItem("tashan_user_uid");
      if (storedUid && userStatus?.approved) {
        navigate('/wingo');
        return;
      }
    }
    
    // Check if user has registered UID
    const storedUid = localStorage.getItem("tashan_user_uid");
    if (storedUid) {
      setUserUid(storedUid);
      setShowVipPredictionDialog(true);
    } else {
      setShowRegisterDialog(true);
    }
  };

  const handleRegistrationSuccess = (uid: string) => {
    setUserUid(uid);
    setShowRegisterDialog(false);
    setShowVipPredictionDialog(true);
  };

  const handleBackToRegister = () => {
    localStorage.removeItem("tashan_user_uid");
    setUserUid("");
    setShowVipPredictionDialog(false);
    setShowRegisterDialog(true);
  };

  const handleCloseDialogs = () => {
    setShowRegisterDialog(false);
    setShowVipPredictionDialog(false);
    setShowComingSoonDialog(false);
    setShowDemoDialog(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 navbar-dark px-4 shadow-lg z-50 transition-all duration-300 ${
          isScrolled ? 'border-b-2' : ''
        }`} 
        style={{ 
          height: '60px',
          borderBottomColor: isScrolled ? '#a28422' : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full relative">
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
          <div className="md:hidden flex items-center">
            {userStatus?.approved ? (
              <div 
                className="px-3 py-1.5 rounded-full text-black font-bold text-xs"
                style={{ backgroundColor: '#FED358' }}
              >
                UID: {userUid}
              </div>
            ) : (
              <button 
                className="px-3 py-1.5 rounded-full text-black font-bold text-xs transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#FFB472' }}
                onClick={() => console.log('Join VIP clicked')}
              >
                JOIN VIP
              </button>
            )}
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {userStatus?.approved ? (
              <div 
                className="px-4 py-2 rounded-full text-black font-bold text-sm"
                style={{ backgroundColor: '#FED358' }}
              >
                UID: {userUid}
              </div>
            ) : (
              <button 
                className="px-4 py-2 rounded-full text-black font-bold text-sm transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: '#FFB472' }}
                onClick={() => console.log('Join VIP clicked')}
              >
                JOIN VIP
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Welcome Banner - Full Width */}
      <div style={{ padding: '24px 34px', marginTop: '60px' }}>
        <Card className="bg-banner-gradient rounded-lg py-1 px-3 mb-4 border-2 border-accent-gold shadow-lg w-full mx-auto">
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

      {/* VIP Prediction Banner - Mobile and iPad only */}
      <div className="px-6 md:px-8 lg:hidden pb-6 -mt-2">
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img 
              src={mobileBannerImage} 
              alt="VIP Prediction - Unlock Pro Money, Never get loss" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* VIP Prediction Banner - Desktop only */}
      <div className="hidden lg:block px-6 md:px-8 lg:px-12 xl:px-16 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img 
              src={desktopBannerImage} 
              alt="VIP Prediction - Unlock Pro Money, Never get loss" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - Below Hero Banner */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-6">
        <div className="max-w-2xl mx-auto lg:max-w-7xl">
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-center">
            {/* DEMO Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-4 sm:px-6 md:px-8 py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => setShowDemoDialog(true)}
            >
              DEMO
            </button>
            
            {/* PROOF Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-4 sm:px-6 md:px-8 py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => {
                console.log('Proof clicked');
                setShowProofDialog(true);
              }}
            >
              PROOF
            </button>
            
            {/* VIP Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-4 sm:px-6 md:px-8 py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => console.log('VIP clicked')}
            >
              VIP
            </button>
          </div>
        </div>
      </div>



      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 lg:max-w-7xl lg:mx-0 lg:ml-8 xl:ml-12 lg:px-4 py-6">
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-12 md:gap-y-8 lg:gap-x-8 lg:gap-y-8 xl:gap-x-12 xl:gap-y-8">
          
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
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-6 xl:gap-x-8 xl:gap-y-6">
          
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

        {/* Secondary Action Buttons */}
        <div className="mt-6 flex justify-center">
          <div className="flex flex-row gap-1 sm:gap-2 md:gap-4 lg:gap-6 justify-center items-center w-full max-w-sm sm:max-w-md md:max-w-lg">
            {/* About Us Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base"
              onClick={() => console.log('About Us clicked')}
            >
              ABOUT US
            </button>
            
            {/* Disclaimer Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base"
              onClick={() => console.log('Disclaimer clicked')}
            >
              DISCLAIMER
            </button>
            
            {/* Warning Button */}
            <button 
              className="flex-1 md:flex-none md:w-32 lg:w-36 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base"
              onClick={() => console.log('Warning clicked')}
            >
              WARNING
            </button>
          </div>
        </div>

      </div>

      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/tashanwinvi" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:scale-110"
      >
        <FaTelegram className="text-white text-2xl" />
      </a>

      {/* Registration Dialog */}
      <RegistrationDialog
        isOpen={showRegisterDialog}
        onClose={handleCloseDialogs}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      {/* VIP Prediction Dialog */}
      <VipPredictionDialog
        isOpen={showVipPredictionDialog}
        onClose={handleCloseDialogs}
        uid={userUid}
        onBackToRegister={handleBackToRegister}
      />

      {/* Coming Soon Dialog */}
      <ComingSoonDialog
        isOpen={showComingSoonDialog}
        onClose={() => setShowComingSoonDialog(false)}
        gameName={selectedGameName}
      />

      {/* Proof Dialog */}
      {showProofDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl border-2 border-white/20" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FFE082 50%, #FFF3A0 100%)' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">System Proof - Live Results</h2>
                <button
                  onClick={() => setShowProofDialog(false)}
                  className="text-gray-600 hover:text-black text-2xl font-bold bg-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/40 transition-all duration-200"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full mr-3"></span>
                    Live Prediction Interface
                  </h3>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30">
                    <img 
                      src={proofImage1} 
                      alt="Live Wingo Prediction System showing BIG 8 prediction with timer" 
                      className="w-3/4 mx-auto rounded-xl shadow-2xl border-2 border-white/50"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-3"></span>
                    Results & Rewards System
                  </h3>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30">
                    <img 
                      src={proofImage2} 
                      alt="Congratulations screen showing Red 8 Big result with ₹1,960 bonus" 
                      className="w-3/4 mx-auto rounded-xl shadow-2xl border-2 border-white/50"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl p-6 border border-green-400/30 backdrop-blur-sm">
                  <h4 className="text-black font-bold text-lg mb-4 flex items-center">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>
                    Verified Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black">
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Truly balanced predictions</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Live API integration</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Real-time countdown timers</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Authentic period numbers</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>User registration system</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Admin panel controls</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Results & rewards tracking</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>Multi-variant support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Dialog */}
      {showDemoDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl border-2 border-white/20" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FFE082 50%, #FFF3A0 100%)' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Demo - How It Works</h2>
                <button
                  onClick={() => setShowDemoDialog(false)}
                  className="text-gray-600 hover:text-black text-2xl font-bold bg-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/40 transition-all duration-200"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</span>
                    Choose Game Variant
                  </h3>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30">
                    <img 
                      src={demoImage1} 
                      alt="Wingo game variants selection" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2 border-white/50"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</span>
                    View Period & Timer
                  </h3>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30">
                    <img 
                      src={demoImage2} 
                      alt="Period number and countdown timer" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2 border-white/50"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</span>
                    Get VIP Prediction
                  </h3>
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30">
                    <img 
                      src={demoImage3} 
                      alt="VIP prediction showing color, size and number" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2 border-white/50"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm">
                  <h4 className="text-black font-bold text-lg mb-4 flex items-center">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">🚀</span>
                    How to Get Started
                  </h4>
                  <div className="text-sm text-black space-y-3">
                    <div className="flex items-center"><span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</span>Click on any game card</div>
                    <div className="flex items-center"><span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</span>Register with your UID</div>
                    <div className="flex items-center"><span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</span>Wait for admin approval</div>
                    <div className="flex items-center"><span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</span>Access VIP predictions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
