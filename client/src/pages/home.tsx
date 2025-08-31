import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTelegram } from "react-icons/fa";
import { useLocation } from "wouter";
import RegistrationDialog from "@/components/registration-dialog";
import VipPredictionDialog from "@/components/vip-prediction-dialog";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import { useUserVerification } from "@/hooks/use-fast-user-status";
import type { GameConfig } from "@shared/schema";
import logoPath from "@assets/logo_nav_1756545819204.png";
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
import mobileBannerImage from "@assets/202508291426595421003_1756613438340.png";
import desktopBannerImage from "@assets/202508291426595421003_1756613438340.png";
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
  const [showAboutUsDialog, setShowAboutUsDialog] = useState(false);
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState<string>("");
  const [userUid, setUserUid] = useState<string>("");

  // Fetch game configurations (public endpoint)
  const { data: gameConfigs = [] } = useQuery<GameConfig[]>({
    queryKey: ["/api/games"],
  });

  // Use fast user verification hook for optimal performance
  const { isApproved, isRegistered, refreshStatus } = useUserVerification(userUid);

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
      if (storedUid && isApproved) {
        navigate('/wingo');
        return;
      }
    }
    
    // Special handling for Trx Wingo - redirect to TRX Wingo page if approved
    if (gameType === "Trx Wingo") {
      const storedUid = localStorage.getItem("tashan_user_uid");
      if (storedUid && isApproved) {
        navigate('/trx-wingo');
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
    // Immediately refresh user status after registration
    setTimeout(() => refreshStatus(), 100);
  };

  const handleBackToRegister = () => {
    localStorage.removeItem("tashan_user_uid");
    setUserUid("");
    setShowVipPredictionDialog(false);
    setShowRegisterDialog(true);
  };

  const handleVipClick = () => {
    console.log('VIP clicked');
    // Check if user has registered UID and is approved
    const storedUid = localStorage.getItem("tashan_user_uid");
    if (storedUid && isApproved) {
      // User is approved, show VIP prediction dialog
      setShowVipPredictionDialog(true);
    } else {
      // User is not approved or not registered, show registration dialog
      setShowRegisterDialog(true);
    }
  };

  const handleJoinVipClick = () => {
    console.log('Join VIP clicked');
    // Show registration dialog for JOIN VIP buttons
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
          borderBottomColor: isScrolled ? '#0b3681' : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full relative">
          {/* Logo Section */}
          <div className="flex items-center logo-spacing-mobile md:logo-spacing-tablet lg:logo-spacing-desktop">
            <img 
              src={logoPath} 
              alt="V3.GAME Logo" 
              className="w-auto object-contain"
              style={{ height: '30px' }}
            />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            {isApproved ? (
              <div 
                className="px-3 py-1.5 rounded-full text-black font-bold text-xs"
                style={{ backgroundColor: '#FED358' }}
              >
                UID: {userUid}
              </div>
            ) : (
              <button 
                className="px-3 py-1.5 rounded-full text-black font-bold text-xs transition-opacity duration-200 hover:opacity-90"
                style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
                onClick={handleJoinVipClick}
              >
                JOIN VIP
              </button>
            )}
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {isApproved ? (
              <div 
                className="px-4 py-2 rounded-full text-black font-bold text-sm"
                style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
              >
                UID: {userUid}
              </div>
            ) : (
              <button 
                className="px-4 py-2 rounded-full text-black font-bold text-sm transition-opacity duration-200 hover:opacity-90"
                style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
                onClick={handleJoinVipClick}
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
                  Welcome to V3 GAME VIP PREDICTION APP, we will serve you Special Predictions!
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
              alt="V3 GAME - Lucky 10 Days Recharge Bonus" 
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
              alt="V3 GAME - Lucky 10 Days Recharge Bonus" 
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
              onClick={handleVipClick}
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
              className="flex-1 md:flex-none md:w-40 lg:w-44 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap"
              onClick={() => setShowAboutUsDialog(true)}
            >
              ABOUT US
            </button>
            
            {/* Disclaimer Button */}
            <button 
              className="flex-1 md:flex-none md:w-40 lg:w-44 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap"
              onClick={() => setShowDisclaimerDialog(true)}
            >
              DISCLAIMER
            </button>
            
            {/* Warning Button */}
            <button 
              className="flex-1 md:flex-none md:w-40 lg:w-44 px-2 sm:px-3 md:px-6 lg:px-8 py-1.5 sm:py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base whitespace-nowrap"
              onClick={() => setShowWarningDialog(true)}
            >
              WARNING
            </button>
          </div>
        </div>

      </div>

      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/TashanGamesss" 
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
          <div className="rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: 'rgb(56, 46, 53)', border: '2px solid #FED358' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FED358' }}>System Proof - Live Results</h2>
                <button
                  onClick={() => setShowProofDialog(false)}
                  className="text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ color: '#FDE4BC', backgroundColor: 'rgba(254, 211, 88, 0.2)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.4)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.2)'}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: '#E67E22' }}></span>
                    Live Prediction Interface
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={proofImage1} 
                      alt="Live Wingo Prediction System showing BIG 8 prediction with timer" 
                      className="w-3/4 mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: '#2ECC71' }}></span>
                    Results & Rewards System
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={proofImage2} 
                      alt="Congratulations screen showing Red 8 Big result with ₹1,960 bonus" 
                      className="w-3/4 mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)', border: '1px solid rgba(46, 204, 113, 0.4)' }}>
                  <h4 className="font-bold text-lg mb-4 flex items-center" style={{ color: '#2ECC71' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3" style={{ backgroundColor: '#2ECC71' }}>✓</span>
                    Verified Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" style={{ color: '#FDE4BC' }}>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Truly balanced predictions</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Live API integration</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Real-time countdown timers</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Authentic period numbers</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>User registration system</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Admin panel controls</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Results & rewards tracking</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#2ECC71' }}></span>Multi-variant support</div>
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
          <div className="rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: 'rgb(56, 46, 53)', border: '2px solid #FED358' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FED358' }}>Demo - How It Works</h2>
                <button
                  onClick={() => setShowDemoDialog(false)}
                  className="text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ color: '#FDE4BC', backgroundColor: 'rgba(254, 211, 88, 0.2)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.4)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.2)'}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3" style={{ backgroundColor: '#9B59B6' }}>1</span>
                    Choose Game Variant
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage1} 
                      alt="Wingo game variants selection" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2" 
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3" style={{ backgroundColor: '#E67E22' }}>2</span>
                    View Period & Timer
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage2} 
                      alt="Period number and countdown timer" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3" style={{ backgroundColor: '#E74C3C' }}>3</span>
                    Get VIP Prediction
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage3} 
                      alt="VIP prediction showing color, size and number" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3" style={{ backgroundColor: '#2ECC71' }}>4</span>
                    How to Get Started
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(155, 89, 182, 0.2)', border: '1px solid rgba(155, 89, 182, 0.4)' }}>
                    <div className="text-sm space-y-3" style={{ color: '#FDE4BC' }}>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3" style={{ backgroundColor: '#9B59B6' }}>1</span>Click on any game card</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3" style={{ backgroundColor: '#9B59B6' }}>2</span>Register with your UID</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3" style={{ backgroundColor: '#9B59B6' }}>3</span>Wait for admin approval</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3" style={{ backgroundColor: '#9B59B6' }}>4</span>Access VIP predictions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Us Dialog */}
      {showAboutUsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: 'rgb(56, 46, 53)', border: '2px solid #FED358' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FED358' }}>About Tashan Win VIP</h2>
                <button
                  onClick={() => setShowAboutUsDialog(false)}
                  className="text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ color: '#FDE4BC', backgroundColor: 'rgba(254, 211, 88, 0.2)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.4)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.2)'}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                  <p className="text-lg font-semibold text-center mb-4" style={{ color: '#FDE4BC' }}>
                    "Life is a gamble and We live only once, so let's have fun at Tashan Win Vip!"
                  </p>
                </div>

                <div className="space-y-4" style={{ color: '#FDE4BC' }}>
                  <p className="text-base leading-relaxed">
                    Welcome to <span className="font-bold" style={{ color: '#FED358' }}>Tashan Win Vip</span>, the leading online platform for predicting winning numbers in popular Wingo lottery games. Our expert data and AI analysts have developed an advanced algorithm that analyzes past lottery draws and player behavior to provide 100% accurate predictions.
                  </p>

                  <p className="text-base leading-relaxed">
                    At Tashan Win Vip, we believe everyone deserves a chance to win big. Just visit the prediction section, select your game platform, click 'predict', and get your predictions for the winning color, size, and number.
                  </p>

                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)', border: '1px solid rgba(46, 204, 113, 0.4)' }}>
                    <p className="font-bold text-center text-lg" style={{ color: '#2ECC71' }}>
                      🎯 We're proud of our 100% success rate! 🎯
                    </p>
                  </div>

                  <p className="text-base leading-relaxed">
                    If you have any questions, feel free to contact us through email or live chat support. Don't wait! Go to the predict section and start predicting like a pro with Our Vip App!
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.4)' }}>
                  <h4 className="font-bold text-lg mb-3 text-center" style={{ color: '#FED358' }}>
                    🚀 Ready to Start Winning?
                  </h4>
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        setShowAboutUsDialog(false);
                        document.querySelector('.max-w-2xl')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: '#FED358', color: '#231C21' }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FFE082'}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FED358'}
                    >
                      Start Predicting Now!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Dialog */}
      {showDisclaimerDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: 'rgb(56, 46, 53)', border: '2px solid #FED358' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FED358' }}>Disclaimer</h2>
                <button
                  onClick={() => setShowDisclaimerDialog(false)}
                  className="text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ color: '#FDE4BC', backgroundColor: 'rgba(254, 211, 88, 0.2)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.4)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.2)'}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 165, 0, 0.2)', border: '1px solid rgba(255, 165, 0, 0.4)' }}>
                  <p className="font-bold text-center text-lg mb-4" style={{ color: '#FFA500' }}>
                    ⚠️ Important Notice ⚠️
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                    Please note that Our Vip App provides predictions based on statistical analysis and past lottery results. Our predictions are meant to serve as a guide, and not to encourage addiction.
                  </p>
                </div>

                <div className="space-y-4" style={{ color: '#FDE4BC' }}>
                  <p className="text-base leading-relaxed">
                    We make predictions for platforms, and if they shut down or if something happens to them, we are not responsible.
                  </p>

                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)', border: '1px solid rgba(231, 76, 60, 0.4)' }}>
                    <p className="font-bold text-center text-lg mb-3" style={{ color: '#E74C3C' }}>
                      🎲 Risk Notice 🎲
                    </p>
                    <p className="text-base leading-relaxed text-center" style={{ color: '#FDE4BC' }}>
                      Participation in lottery games involves risk. It is important to play responsibly and within your financial limits.
                    </p>
                  </div>

                  <p className="text-base leading-relaxed">
                    By using our services, you acknowledge that you understand the risks involved and agree to take responsibility for your decisions and actions.
                  </p>

                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(52, 152, 219, 0.2)', border: '1px solid rgba(52, 152, 219, 0.4)' }}>
                    <p className="font-bold text-center text-lg mb-3" style={{ color: '#3498DB' }}>
                      🎯 Remember 🎯
                    </p>
                    <p className="text-base leading-relaxed text-center" style={{ color: '#FDE4BC' }}>
                      Lottery games are a form of gambling, and it is essential to make informed choices.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.4)' }}>
                  <div className="text-center">
                    <button 
                      onClick={() => setShowDisclaimerDialog(false)}
                      className="px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: '#FED358', color: '#231C21' }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FFE082'}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FED358'}
                    >
                      I Understand
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Dialog */}
      {showWarningDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: 'rgb(56, 46, 53)', border: '2px solid #FED358' }}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold" style={{ color: '#FED358' }}>Important Warning</h2>
                <button
                  onClick={() => setShowWarningDialog(false)}
                  className="text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                  style={{ color: '#FDE4BC', backgroundColor: 'rgba(254, 211, 88, 0.2)' }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.4)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(254, 211, 88, 0.2)'}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(230, 126, 34, 0.2)', border: '1px solid rgba(230, 126, 34, 0.4)' }}>
                  <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                    At Tashan Win Vip, we believe in empowering our users with knowledge. It's crucial to understand that to use advanced systems like SHA-256 for generating random results, there's always a potential for manipulation. This is where our expertise comes in handy.
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)', border: '1px solid rgba(46, 204, 113, 0.4)' }}>
                  <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: '#2ECC71' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3" style={{ backgroundColor: '#2ECC71' }}>🛡️</span>
                    How We Protect You:
                  </h3>
                  <div className="space-y-3" style={{ color: '#FDE4BC' }}>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#2ECC71' }}></span>
                      <span>Our sophisticated API system constantly monitors these platforms, tracking any data that might be manipulated.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#2ECC71' }}></span>
                      <span>We use advanced algorithms to detect patterns and anomalies that could indicate unfair practices.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#2ECC71' }}></span>
                      <span>Our predictions are based on a comprehensive analysis of multiple factors, not just the platform's provided data.</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(231, 76, 60, 0.2)', border: '1px solid rgba(231, 76, 60, 0.4)' }}>
                  <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: '#E74C3C' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3" style={{ backgroundColor: '#E74C3C' }}>⚠️</span>
                    Potential Manipulation Tactics:
                  </h3>
                  <div className="space-y-3" style={{ color: '#FDE4BC' }}>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#E74C3C' }}></span>
                      <div>
                        <span className="font-semibold">Controlled "Randomness": </span>
                        <span>Platforms might influence when and how their "random" number generation is applied.</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#E74C3C' }}></span>
                      <div>
                        <span className="font-semibold">Hidden Algorithm Changes: </span>
                        <span>Sudden, undisclosed changes to algorithms could unfairly shift odds.</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#E74C3C' }}></span>
                      <div>
                        <span className="font-semibold">Selective Payout Practices: </span>
                        <span>Some platforms might delay or withhold certain payouts without clear explanation.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(155, 89, 182, 0.2)', border: '1px solid rgba(155, 89, 182, 0.4)' }}>
                  <h3 className="font-bold text-xl mb-4 flex items-center" style={{ color: '#9B59B6' }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm mr-3" style={{ backgroundColor: '#9B59B6' }}>🧠</span>
                    Stay Informed, Play Smart:
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                    We urge all our users to approach these platforms with a critical eye. Always verify a platform's credibility before engaging. With Tashan Win by your side, you're equipped with the insights needed to make informed decisions and maximize your chances of success.
                  </p>
                  
                  <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(254, 211, 88, 0.3)', border: '1px solid rgba(254, 211, 88, 0.5)' }}>
                    <p className="font-bold text-center text-lg" style={{ color: '#FED358' }}>
                      💡 Remember: Knowledge is power – especially in the world of online lotteries! 💡
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.4)' }}>
                  <div className="text-center">
                    <button 
                      onClick={() => setShowWarningDialog(false)}
                      className="px-6 py-3 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: '#FED358', color: '#231C21' }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FFE082'}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FED358'}
                    >
                      Got It, Thanks!
                    </button>
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
