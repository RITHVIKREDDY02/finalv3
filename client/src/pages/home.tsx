import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FaTelegram } from "react-icons/fa";
import RegistrationDialog from "@/components/registration-dialog";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import WelcomeNotification from "@/components/welcome-notification";
import Footer from "@/components/footer";
import logoPath from "@assets/logo_nav_1756545819204.png";
import heroBannerDesktop from "@assets/Site_Banner_(1920_x_400_px)_1765901343932.png";
import heroBannerTablet from "@assets/Site_Banner_(768_x_250_px)_(1536_x_320_px)_1765902253968.png";
import heroBannerMobile from "@assets/Site_Banner_(768_x_250_px)_(1152_x_240_px)_1765902253967.png";
import proofImage1 from "@assets/image_1754150847570.png";
import proofImage2 from "@assets/image_1754150852695.png";
import demoImage1 from "@assets/Screenshot 2025-08-31 172003_1756641606545.png";
import demoImage2 from "@assets/Screenshot 2025-08-31 172048_1756641612873.png";
import demoImage3 from "@assets/Screenshot 2025-08-31 172018_1756641617812.png";
import liveInterfaceImage from "@assets/Screenshot 2025-08-31 171820_1756656529215.png";
import faviconIcon from "@assets/h5setting_20250501162804ytau_1754156061703.png";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [showAboutUsDialog, setShowAboutUsDialog] = useState(false);
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGameClick = (gameType: string) => {
    console.log(`${gameType} game selected`);
    setSelectedGameName(gameType);
    setShowComingSoonDialog(true);
  };

  const handleVipClick = () => {
    console.log('VIP clicked');
    setShowRegisterDialog(true);
  };

  const handleJoinVipClick = () => {
    console.log('Join VIP clicked');
    setShowRegisterDialog(true);
  };

  const handleCloseDialogs = () => {
    setShowRegisterDialog(false);
    setShowComingSoonDialog(false);
    setShowDemoDialog(false);
  };

  return (
    <div className="min-h-screen">
      {/* Welcome Notification - Shows on first visit */}
      <WelcomeNotification onRegisterClick={handleJoinVipClick} />
      
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
              alt="V3 GAME Logo" 
              className="w-auto object-contain h-5 md:h-7"
            />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              className="px-3 py-1.5 rounded-full text-black font-bold text-xs transition-opacity duration-200 hover:opacity-90"
              style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
              onClick={handleJoinVipClick}
            >
              JOIN VIP
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: '#FED358' }}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div 
              className="md:hidden absolute top-full left-0 right-0 py-4 px-6 shadow-xl"
              style={{ background: 'rgba(0,12,28,0.98)', borderBottom: '2px solid #FED358' }}
            >
              <div className="flex flex-col gap-4">
                <Link 
                  href="/register-guide"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-register-guide"
                >
                  Register Guide
                </Link>
                <Link 
                  href="/login-bonus"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-login-bonus"
                >
                  Login Bonus
                </Link>
                <Link 
                  href="/blog"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-blog"
                >
                  Blog
                </Link>
                <Link 
                  href="/disclaimer"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-disclaimer"
                >
                  Disclaimer
                </Link>
                <Link 
                  href="/contact"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-contact"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
          
          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-6">
            <Link 
              href="/register-guide"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-register-guide"
            >
              Register Guide
            </Link>
            <Link 
              href="/login-bonus"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-login-bonus"
            >
              Login Bonus
            </Link>
            <Link 
              href="/blog"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-blog"
            >
              Blog
            </Link>
            <Link 
              href="/disclaimer"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-disclaimer"
            >
              Disclaimer
            </Link>
            <Link 
              href="/contact"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-contact"
            >
              Contact
            </Link>
            <button 
              className="px-4 py-2 rounded-full text-black font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
              onClick={handleJoinVipClick}
            >
              JOIN VIP
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="px-0 md:px-6 lg:px-0 pb-4 mt-16">
        <div className="max-w-none md:max-w-6xl mx-auto lg:max-w-none">
          <div className="overflow-hidden rounded-none md:rounded-2xl lg:rounded-none shadow-lg lg:shadow-none">
            <picture>
              <source media="(min-width: 1024px)" srcSet={heroBannerDesktop} />
              <source media="(min-width: 768px)" srcSet={heroBannerTablet} />
              <img 
                src={heroBannerMobile} 
                alt="V3 Game - Download App" 
                className="w-full h-auto object-cover rounded-none md:rounded-2xl lg:rounded-none"
                data-testid="img-hero-banner"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Action Buttons - Below Hero Banner */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-6">
        <div className="max-w-2xl mx-auto lg:max-w-7xl">
          {/* Reward Text */}
          <div className="text-center mb-5">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide" style={{ color: '#FED358' }}>
              Register Now & Get Upto ₹500 Sign Up Reward
            </p>
          </div>
          {/* Register and Login Buttons */}
          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-center mb-4">
            {/* REGISTER Button */}
            <button 
              className="flex-1 md:flex-none md:w-40 lg:w-44 px-4 sm:px-6 md:px-8 py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => window.open("https://www.v3gameb.com/#/pages/login/register?invitationCode=7532630349", "_blank")}
              data-testid="button-register"
            >
              REGISTER
            </button>
            
            {/* LOGIN Button */}
            <button 
              className="flex-1 md:flex-none md:w-40 lg:w-44 px-4 sm:px-6 md:px-8 py-2 custom-button font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              onClick={() => window.open("https://www.v3gameb.com/#/pages/login/login", "_blank")}
              data-testid="button-login"
            >
              LOGIN
            </button>
          </div>
          
        </div>
      </div>



      {/* Footer */}
      <Footer />

      {/* Floating Telegram Button */}
      <a 
        href="https://t.me/Earn_With_Milind_77" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:scale-110"
      >
        <FaTelegram className="text-white text-2xl" />
      </a>

      {/* Registration Dialog */}
      <RegistrationDialog
        isOpen={showRegisterDialog}
        onClose={handleCloseDialogs}
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
                    <span className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: '#2ECC71' }}></span>
                    Live Prediction Interface
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={liveInterfaceImage} 
                      alt="Live Wingo prediction interface with game tabs, period timer, VIP prediction and live players" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2"
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
          <div className="rounded-3xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl border-2" style={{ backgroundColor: '#231C21', border: '2px solid #FED358' }}>
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
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3" style={{ backgroundColor: '#FED358' }}>1</span>
                    Choose Game Variant
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage1} 
                      alt="Wingo game variants - 30Sec, 1Min, 3Min, 5Min selection tabs" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2" 
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3" style={{ backgroundColor: '#FED358' }}>2</span>
                    View Period & Timer
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage2} 
                      alt="Wingo 30Sec period 2050831208Z with Time Remaining 00:26" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3" style={{ backgroundColor: '#FED358' }}>3</span>
                    Get VIP Prediction
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <img 
                      src={demoImage3} 
                      alt="VIP Prediction - Color Green, Size BIG, Number 8" 
                      className="w-full mx-auto rounded-xl shadow-2xl border-2"
                      style={{ borderColor: '#FED358' }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#FED358' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3" style={{ backgroundColor: '#FED358' }}>4</span>
                    How to Get Started
                  </h3>
                  <div className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(254, 211, 88, 0.1)', border: '1px solid rgba(254, 211, 88, 0.3)' }}>
                    <div className="text-sm space-y-3" style={{ color: '#FDE4BC' }}>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs mr-3" style={{ backgroundColor: '#FED358' }}>1</span>Click on any game card</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs mr-3" style={{ backgroundColor: '#FED358' }}>2</span>Register with your UID</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs mr-3" style={{ backgroundColor: '#FED358' }}>3</span>Wait for admin approval</div>
                      <div className="flex items-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs mr-3" style={{ backgroundColor: '#FED358' }}>4</span>Access VIP predictions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Us Dialog - Modern Design */}
      {showAboutUsDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #1a1520 0%, #0d0a12 100%)' }}>
            {/* Hero Section */}
            <div className="relative h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 50%, #E74C3C 100%)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🏆</div>
                  <h2 className="text-3xl font-black text-black tracking-tight">About V3 GAME VIP</h2>
                </div>
              </div>
              <button
                onClick={() => setShowAboutUsDialog(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200 text-white text-xl font-bold"
                data-testid="button-close-about"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-10rem)]">
              {/* Quote Card */}
              <div className="relative mb-8 p-6 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(255,107,53,0.1) 100%)', border: '1px solid rgba(254,211,88,0.3)' }}>
                <div className="absolute top-2 left-4 text-5xl opacity-30" style={{ color: '#FED358' }}>"</div>
                <p className="text-xl font-semibold text-center italic relative z-10" style={{ color: '#FDE4BC' }}>
                  Life is a gamble and We live only once, so let's have fun at V3 GAME VIP!
                </p>
                <div className="absolute bottom-2 right-4 text-5xl opacity-30" style={{ color: '#FED358' }}>"</div>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}>
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#2ECC71' }}>100% Success Rate</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>Our advanced AI algorithm delivers accurate predictions every time.</p>
                </div>
                
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                      <span className="text-white text-lg">🤖</span>
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#3498DB' }}>AI-Powered</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>Expert data analysts and cutting-edge algorithms work for you.</p>
                </div>
                
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.3)' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, #9B59B6, #8E44AD)' }}>
                      <span className="text-white text-lg">⚡</span>
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#9B59B6' }}>Instant Results</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>Get predictions for color, size, and number in seconds.</p>
                </div>
                
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.3)' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
                      <span className="text-black text-lg">💬</span>
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#FED358' }}>24/7 Support</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>Email and live chat support always available.</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 space-y-4" style={{ color: '#FDE4BC' }}>
                <p className="text-base leading-relaxed">
                  Welcome to <span className="font-bold" style={{ color: '#FED358' }}>V3 GAME VIP</span>, the leading platform for Wingo lottery predictions. Our experts analyze past draws and player behavior to deliver unmatched accuracy.
                </p>
                <p className="text-base leading-relaxed">
                  Everyone deserves a chance to win big. Select your game, click 'predict', and receive your winning predictions instantly!
                </p>
              </div>

              {/* CTA Section */}
              <div className="relative p-6 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.2) 0%, rgba(255,107,53,0.2) 100%)' }}>
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(254,211,88,0.5) 0%, transparent 50%)' }}></div>
                <div className="relative z-10 text-center">
                  <h4 className="font-bold text-2xl mb-4" style={{ color: '#FED358' }}>🚀 Ready to Start Winning?</h4>
                  <button 
                    onClick={() => {
                      setShowAboutUsDialog(false);
                      setShowRegisterDialog(true);
                    }}
                    className="px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                    style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                    data-testid="button-start-predicting"
                  >
                    Start Predicting Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Dialog - Modern Design */}
      {showDisclaimerDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #1a1520 0%, #0d0a12 100%)' }}>
            {/* Hero Section */}
            <div className="relative h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFA500 0%, #FF6B35 50%, #E74C3C 100%)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">⚖️</div>
                  <h2 className="text-3xl font-black text-black tracking-tight">Legal Disclaimer</h2>
                </div>
              </div>
              <button
                onClick={() => setShowDisclaimerDialog(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200 text-white text-xl font-bold"
                data-testid="button-close-disclaimer"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-10rem)]">
              {/* Important Notice Banner */}
              <div className="relative mb-6 p-5 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,165,0,0.2) 0%, rgba(255,107,53,0.15) 100%)', borderLeft: '4px solid #FFA500' }}>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FFA500, #FF6B35)' }}>
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: '#FFA500' }}>Important Notice</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#FDE4BC' }}>
                      Our VIP App provides predictions based on statistical analysis and past lottery results. These predictions serve as a guide only.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer Points */}
              <div className="space-y-4 mb-6">
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(231,76,60,0.1)', borderLeft: '4px solid #E74C3C' }}>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)' }}>
                      <span className="text-white text-lg">🎲</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: '#E74C3C' }}>Risk Notice</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#FDE4BC' }}>
                        Participation in lottery games involves risk. Play responsibly and within your financial limits.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', borderLeft: '4px solid #3498DB' }}>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                      <span className="text-white text-lg">🛡️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: '#3498DB' }}>Platform Disclaimer</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#FDE4BC' }}>
                        We are not responsible if third-party platforms shut down or experience issues.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl" style={{ background: 'rgba(155,89,182,0.1)', borderLeft: '4px solid #9B59B6' }}>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #9B59B6, #8E44AD)' }}>
                      <span className="text-white text-lg">📋</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: '#9B59B6' }}>User Responsibility</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#FDE4BC' }}>
                        By using our services, you acknowledge the risks and accept responsibility for your decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remember Box */}
              <div className="relative mb-6 p-5 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(46,204,113,0.15) 0%, rgba(39,174,96,0.1) 100%)', border: '1px solid rgba(46,204,113,0.3)' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3" style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}>
                    <span className="text-2xl">💡</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: '#2ECC71' }}>Remember</h4>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>
                    Lottery games are a form of gambling. Always make informed choices and never bet more than you can afford to lose.
                  </p>
                </div>
              </div>

              {/* Accept Button */}
              <div className="text-center">
                <button 
                  onClick={() => setShowDisclaimerDialog(false)}
                  className="px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                  style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                  data-testid="button-accept-disclaimer"
                >
                  I Understand & Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning Dialog - Modern Design */}
      {showWarningDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #1a1520 0%, #0d0a12 100%)' }}>
            {/* Hero Section */}
            <div className="relative h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 50%, #922B21 100%)' }}>
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🛡️</div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Security Warning</h2>
                </div>
              </div>
              <button
                onClick={() => setShowWarningDialog(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-all duration-200 text-white text-xl font-bold"
                data-testid="button-close-warning"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-10rem)]">
              {/* Intro */}
              <div className="relative mb-6 p-5 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(230,126,34,0.15) 0%, rgba(231,76,60,0.1) 100%)', borderLeft: '4px solid #E67E22' }}>
                <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                  At V3 GAME VIP, we empower users with knowledge. Platforms using systems like SHA-256 for random results can be manipulated. Our expertise helps you stay ahead.
                </p>
              </div>

              {/* How We Protect You */}
              <div className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}>
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="font-bold text-xl" style={{ color: '#2ECC71' }}>How We Protect You</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center p-3 rounded-xl" style={{ background: 'rgba(46,204,113,0.1)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background: '#2ECC71' }}>
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#FDE4BC' }}>Sophisticated API monitoring for data manipulation</span>
                  </div>
                  <div className="flex items-center p-3 rounded-xl" style={{ background: 'rgba(46,204,113,0.1)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background: '#2ECC71' }}>
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#FDE4BC' }}>Advanced pattern detection algorithms</span>
                  </div>
                  <div className="flex items-center p-3 rounded-xl" style={{ background: 'rgba(46,204,113,0.1)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background: '#2ECC71' }}>
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#FDE4BC' }}>Multi-factor analysis beyond platform data</span>
                  </div>
                </div>
              </div>

              {/* Manipulation Tactics */}
              <div className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)' }}>
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="font-bold text-xl" style={{ color: '#E74C3C' }}>Watch Out For</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(231,76,60,0.1)' }}>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ background: '#E74C3C' }}>
                        <span className="text-white text-xs">!</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: '#E74C3C' }}>Controlled "Randomness"</span>
                        <p className="text-xs mt-1" style={{ color: '#FDE4BC' }}>Platforms may influence how "random" generation works.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(231,76,60,0.1)' }}>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ background: '#E74C3C' }}>
                        <span className="text-white text-xs">!</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: '#E74C3C' }}>Hidden Algorithm Changes</span>
                        <p className="text-xs mt-1" style={{ color: '#FDE4BC' }}>Undisclosed changes that unfairly shift odds.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(231,76,60,0.1)' }}>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" style={{ background: '#E74C3C' }}>
                        <span className="text-white text-xs">!</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: '#E74C3C' }}>Selective Payout Practices</span>
                        <p className="text-xs mt-1" style={{ color: '#FDE4BC' }}>Delayed or withheld payouts without explanation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Smart */}
              <div className="mb-6 p-5 rounded-2xl" style={{ background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.3)' }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #9B59B6, #8E44AD)' }}>
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="font-bold text-xl" style={{ color: '#9B59B6' }}>Stay Informed, Play Smart</h3>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#FDE4BC' }}>
                  Always verify platform credibility before engaging. With V3 GAME VIP, you have the insights to make informed decisions.
                </p>
                <div className="p-4 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.2) 0%, rgba(255,107,53,0.15) 100%)', border: '1px solid rgba(254,211,88,0.4)' }}>
                  <p className="font-bold text-lg" style={{ color: '#FED358' }}>
                    💡 Knowledge is power in online lotteries! 💡
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <button 
                  onClick={() => setShowWarningDialog(false)}
                  className="px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                  style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                  data-testid="button-acknowledge-warning"
                >
                  Got It, Thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
