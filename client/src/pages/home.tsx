import { Menu, X, Gift, Zap, Target, Shield, Gamepad2, Banknote, Trophy, Send, Users, Smartphone, HeadphonesIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FaTelegram } from "react-icons/fa";
import RegistrationDialog from "@/components/registration-dialog";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import WelcomeNotification from "@/components/welcome-notification";
import Footer from "@/components/footer";
const logoPath = "/images/logo.webp";
const heroBannerDesktop = "/images/banner-desktop.webp";
const heroBannerTablet = "/images/banner-tablet.webp";
const heroBannerMobile = "/images/banner-mobile.webp";
const proofImage1 = "/images/proof1.webp";
const proofImage2 = "/images/proof2.webp";
const demoImage1 = "/images/demo1.webp";
const demoImage2 = "/images/demo2.webp";
const demoImage3 = "/images/demo3.webp";
const liveInterfaceImage = "/images/live-interface.webp";
const faviconIcon = "/images/favicon.webp";
const blogImage1 = "/images/1_1765955669623.webp";
const blogImage2 = "/images/2_1765955669624.webp";
const blogImage3 = "/images/3_1765955669624.webp";
const blogImage4 = "/images/4_1765955669625.webp";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
    const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const blogArticles = [
    {
      id: 1,
      slug: "register-guide",
      image: blogImage1,
      title: "How to Register in V3 Game?",
      excerpt: "Complete step-by-step guide to register on V3 Game and claim your sign up bonus.",
      content: `
        <h2>V3 Game Register Online Guide – Get Sign Up Bonus</h2>
        <p>If you are new to the online gaming world and want to start with a trusted platform, V3 Game is one of the popular names in India. This guide will walk you through everything you need to know about how to register online, claim your sign up bonus, and start playing safely and responsibly.</p>
        
        <h3>1. What is V3 Game?</h3>
        <p>V3 Game is an online gaming and entertainment platform that offers users a variety of skill-based and fun games. Indian players often choose it because of its easy registration process, simple user interface, and exciting welcome rewards. Whether you enjoy casual games or competitive play, it provides a mix of both.</p>
        
        <h3>2. Why Choose V3 Game?</h3>
        <ul>
          <li><strong>Quick registration</strong> – You can complete the registration process in just a few minutes.</li>
          <li><strong>Attractive sign-up rewards</strong> – New users can claim a register bonus as soon as they create an account.</li>
          <li><strong>Secure platform</strong> – It uses strong data encryption to keep your account and payments safe.</li>
          <li><strong>Easy withdrawals</strong> – The platform allows fast and hassle-free withdrawals to your verified account.</li>
        </ul>
        
        <h3>3. Step-by-Step Guide to V3 Game Register Online</h3>
        <ol>
          <li>Visit the official V3 Game register link – Make sure you use the correct website to avoid fake pages.</li>
          <li>Click on "Register" or "Sign Up" – This will open the online registration form.</li>
          <li>Enter your mobile number and create a password – This helps secure your account.</li>
          <li>Verify your OTP – An OTP will be sent to your phone for verification.</li>
          <li>Complete your profile – Fill in basic details like name, age, and email.</li>
          <li>Claim your sign up bonus – After registration, you can receive the welcome reward or deposit bonus.</li>
        </ol>
        
        <h3>4. V3 Game Register Bonus and How to Claim It</h3>
        <p>The platform rewards new users with a register bonus as a welcome gift. This can be in the form of free credits, cash bonuses, or promotional offers. To claim this reward:</p>
        <ul>
          <li>Complete your registration using the official register link.</li>
          <li>Make your first deposit (if required).</li>
          <li>Check your account dashboard for bonus details.</li>
        </ul>
        
        <h3>5. Safety Tips Before You Register</h3>
        <ul>
          <li>Always use the official register link to avoid scams.</li>
          <li>Never share your password or OTP with anyone.</li>
          <li>Set strong passwords and keep your login details private.</li>
          <li>Play responsibly and avoid spending more than your set limit.</li>
        </ul>
        
        <h3>6. Login After Registration</h3>
        <ol>
          <li>Go to the website homepage.</li>
          <li>Click on the login option.</li>
          <li>Enter your registered mobile number and password.</li>
          <li>Click "Login" to access your dashboard.</li>
        </ol>
        
        <h3>7. Benefits of Registering on V3 Game</h3>
        <ul>
          <li>Instant sign up bonus and promotional offers.</li>
          <li>Access to exclusive games and tournaments.</li>
          <li>Priority customer support for registered users.</li>
          <li>Opportunity to earn more through referral bonuses.</li>
        </ul>
      `
    },
    {
      id: 2,
      slug: "login-bonus",
      image: blogImage2,
      title: "V3 Game Login & Win Bonus",
      excerpt: "Learn how to login and claim your daily bonuses on V3 Game platform.",
      content: `
        <h2>V3 Game Login & Win Bonus – Your Complete Guide to Fun and Rewards</h2>
        <p>If you love online games that offer real excitement and daily rewards, V3 Game Login is a great choice for you. This platform allows Indian users to play, win, and earn bonuses through a smooth and secure system.</p>
        
        <h3>V3 Game Login Process</h3>
        <p>Here's how to log in easily every time you want to play:</p>
        <ol>
          <li>Go to the V3 Game login app or official website.</li>
          <li>Enter your registered mobile number and password.</li>
          <li>Tap "Login" to access your account.</li>
        </ol>
        <p>If you ever forget your password, there's a simple "Forgot Password" option that helps you reset it instantly.</p>
        <p>Once logged in, you'll see your profile, wallet, and available games on the dashboard.</p>
        
        <h3>V3 Game Lottery and Bonus Opportunities</h3>
        <p>One of the most exciting parts of V3 Game is its lottery system. The lottery section lets players buy tickets for a small amount and stand a chance to win big rewards. The results are updated daily, and you can view them directly on your dashboard.</p>
        <p>Apart from the lottery, players can also enjoy:</p>
        <ul>
          <li>Daily check-in bonuses</li>
          <li>Referral rewards</li>
          <li>Spin-the-wheel offers</li>
          <li>Special festival bonuses</li>
        </ul>
        
        <h3>Safety and Security</h3>
        <p>When it comes to online games, safety is very important. V3 Game uses encrypted connections to keep user data secure. Payments and withdrawals are handled through trusted Indian gateways, making transactions safe and quick.</p>
        <p>Users should always download the app from the official download link to avoid fake or harmful versions.</p>
        
        <h3>Why Choose V3 Game?</h3>
        <ul>
          <li>Easy registration and login process</li>
          <li>Fast bonus crediting system</li>
          <li>Multiple earning options (lottery, spin, and referrals)</li>
          <li>Works on both web and app platforms</li>
          <li>User-friendly design for smooth gameplay</li>
        </ul>
        
        <h3>Responsible Gaming Advice</h3>
        <p>While the V3 platform is designed for entertainment, it's important to play responsibly. Always set a limit on how much time and money you spend on games. Treat it as a fun activity, not as a source of guaranteed income.</p>
      `
    },
    {
      id: 3,
      slug: "wallet-withdraw",
      image: blogImage3,
      title: "How to Withdraw in V3 Game?",
      excerpt: "Complete guide to withdraw money from V3 Game wallet to your bank account.",
      content: `
        <h2>How to Withdraw Money from V3 Game? Guide V3 Game Wallet Withdraw</h2>
        <p>Online earning platforms like V3 Game have become very popular in India. Players enjoy games while also having the opportunity to win real cash. But the most common question players ask is — how to withdraw money from V3 Game safely and easily?</p>
        
        <h3>What is V3 Game Wallet Withdraw?</h3>
        <p>V3 Game is an online gaming and earning app that offers various games, challenges, and rewards. Players can deposit money, play, and earn real cash prizes. The app also provides a V3 Wallet, where all your winnings are stored.</p>
        <p>Once you earn enough balance, you can transfer the funds from your V3 Game Wallet to your bank account or UPI.</p>
        
        <h3>Step-by-Step Process for V3 Game Money Withdraw</h3>
        <ol>
          <li><strong>Login to Your V3 Account</strong> – Open the V3 Game app or website and log in using your registered mobile number or email.</li>
          <li><strong>Go to the Wallet Section</strong> – Tap on the "Wallet" or "My Wallet" option to see your available balance.</li>
          <li><strong>Select the Withdraw Option</strong> – Look for the "Withdraw" button in your Wallet section.</li>
          <li><strong>Enter the Withdrawal Amount</strong> – Enter the exact amount you want to withdraw within the limits.</li>
          <li><strong>Choose Your Payment Method</strong> – V3 Game allows UPI (Google Pay, PhonePe, Paytm), Direct Bank Transfer, or Paytm Wallet.</li>
          <li><strong>Submit and Confirm</strong> – Check your account details before submitting the request.</li>
          <li><strong>Wait for the Transfer</strong> – Withdrawals are usually completed within a few minutes to a few hours.</li>
        </ol>
        
        <h3>Things to Check Before V3 Game Wallet Withdraw</h3>
        <ul>
          <li><strong>Verify your account</strong> – Your mobile number and payment method should be verified.</li>
          <li><strong>Meet the minimum withdrawal limit</strong> – Some platforms require a minimum balance (for example, ₹100).</li>
          <li><strong>Avoid fake apps</strong> – Always use the official V3 Game app or website.</li>
          <li><strong>Stable internet connection</strong> – Interrupted transactions can delay withdrawals.</li>
        </ul>
        
        <h3>Common Issues During V3 Game Wallet Money Withdraw</h3>
        <ul>
          <li><strong>Pending Withdrawals</strong> – If your withdrawal shows as "Pending," wait for 24 hours before contacting support.</li>
          <li><strong>Incorrect UPI or Bank Details</strong> – Make sure your UPI ID or bank account number is entered correctly.</li>
          <li><strong>Unverified Account</strong> – Complete your KYC verification if required.</li>
          <li><strong>Technical Errors</strong> – Try again after some time if there are server delays.</li>
        </ul>
        
        <h3>Tips for Safe and Quick V3 Money Withdraw</h3>
        <ul>
          <li>Use your own account – Always withdraw money to your own verified UPI or bank account.</li>
          <li>Avoid multiple withdrawal requests – Wait for one transaction to complete before starting another.</li>
          <li>Keep screenshots – In case of any dispute, screenshots help when contacting customer support.</li>
          <li>Contact support if delayed – Use the in-app support or email option for help if your funds don't arrive within 24 hours.</li>
        </ul>
      `
    },
    {
      id: 4,
      slug: "app-download",
      image: blogImage4,
      title: "V3 Game App Download",
      excerpt: "Learn how to download the V3 Game app and start playing on your mobile device.",
      content: `
        <h2>V3 Game Login App & Lottery Download – Complete Guide for Indian Users</h2>
        <p>Online gaming and lottery platforms have gained massive popularity across India in recent years. Among these, the V3 Game Login App has quickly become a popular choice for players who enjoy games of skill, entertainment, and luck-based lotteries.</p>
        
        <h3>How to Download the V3 Game App in India?</h3>
        <p>Downloading the V3 Game login app apk is easy and quick. Since it may not be available directly on the Google Play Store, users can follow these steps:</p>
        <ol>
          <li>Visit the official V3 Game website on your mobile browser.</li>
          <li>Find the download link for the V3 Game login apk.</li>
          <li>Tap the link to download the file.</li>
          <li>Once downloaded, go to your phone settings and enable "Install from Unknown Sources."</li>
          <li>Open the apk file and install it on your device.</li>
          <li>After installation, launch the app and complete the V3 Game login process using your registered mobile number or email.</li>
        </ol>
        
        <h3>V3 Game Login Lottery – How It Works?</h3>
        <p>The V3 Game login lottery section allows players to buy digital tickets for upcoming draws. Each lottery has a fixed schedule, and players can view results through their login dashboard. The more tickets you purchase, the higher your chances of winning.</p>
        <p>The lottery operates transparently, displaying winners and results publicly within the app.</p>
        
        <h3>Why Choose the V3 Game Login App in India?</h3>
        <ul>
          <li><strong>Convenience</strong> – Easy to access from anywhere through mobile login or apk download.</li>
          <li><strong>Entertainment</strong> – Offers both gaming and lottery experiences in one place.</li>
          <li><strong>Security</strong> – Uses advanced data protection systems.</li>
          <li><strong>Transparency</strong> – Clear rules and visible results for all lottery draws.</li>
          <li><strong>Accessibility</strong> – Works well on Android devices with low system requirements.</li>
        </ul>
        
        <h3>FAQ's</h3>
        <p><strong>How do I register for V3 Game login?</strong><br/>You can register using your mobile number or email on the official app or website and then log in with your credentials.</p>
        <p><strong>Is the V3 Game login app safe to use in India?</strong><br/>Yes, the app follows standard security measures, making it safe for Indian users who download it from the official source.</p>
        <p><strong>How can I participate in the V3 Game lottery?</strong><br/>After logging in, visit the lottery section, choose your draw, buy tickets, and wait for the result announcements.</p>
        <p><strong>Can I withdraw my earnings easily?</strong><br/>Yes, the app supports quick withdrawals to bank accounts or digital wallets like UPI and Paytm.</p>
      `
    }
  ];

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
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2 text-left"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-register-guide"
                >
                  Register Guide
                </Link>
                <Link 
                  href="/login-bonus"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2 text-left"
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
                  href="/about"
                  className="text-base font-medium py-2 transition-all duration-200 hover:translate-x-2"
                  style={{ color: '#FDE4BC' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="link-mobile-about"
                >
                  About Us
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
              href="/about"
              className="text-sm font-medium transition-all duration-200 hover:opacity-80 hover:scale-105"
              style={{ color: '#FDE4BC' }}
              data-testid="link-about"
            >
              About Us
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
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide" style={{ color: '#FED358' }}>
              V3 Game Download App - Get Upto ₹500 Sign Up Reward
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-3 max-w-3xl mx-auto leading-relaxed">
              In today's fast-paced digital world, online games need to be engaging, rewarding, and simple to use—and that's exactly what V3 Game delivers. Whether you're new to online gaming or a seasoned player, V3 Game offers a mix of thrilling gameplay, bonus features, and real earning potential.
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

          {/* Join Telegram Button */}
          <div className="flex justify-center mt-4">
            <a 
              href="https://t.me/Earn_With_Milind_77" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              style={{ background: 'linear-gradient(135deg, #0088cc 0%, #00aced 100%)' }}
              data-testid="button-join-telegram"
            >
              <FaTelegram className="text-lg" />
              JOIN TELEGRAM
            </a>
          </div>

          {/* Community Text */}
          <div className="text-center mt-6 mb-8">
            <p className="text-sm sm:text-base md:text-lg font-medium" style={{ color: '#FDE4BC' }}>
              Join our exclusive trading community and start receiving premium signals instantly!
            </p>
          </div>
          
        </div>
      </div>

      {/* What is V2 Game Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12" data-testid="section-what-is-v2">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#FED358' }} data-testid="heading-what-is-v2">
            What is V2 Game?
          </h1>
          <div className="text-sm md:text-base max-w-4xl leading-relaxed space-y-4" style={{ color: '#FDE4BC' }} data-testid="text-what-is-v2-description">
            <p>
              V2 Game is an online gaming and earning platform that allows users to play multiple games in different categories, make smart bets, and potentially win real cash rewards. It combines entertainment and opportunity into one seamless experience, making it perfect for anyone looking to turn their free time into a fun, rewarding activity.
            </p>
            <p>
              What makes V2 Game lottery stand out is its wide range of games from casual classics like Mines and Go Rush to advanced games like Aviator, 5D, and Dragon Tiger. Whether you're a seasoned player or a beginner trying out your luck, V2 Game gives everyone an equal chance to win.
            </p>
            <p>
              And thanks to secure transactions, real-time results, and transparent systems, you can trust the platform every step of the way. You can also take part in its referral programs, special promotions, and jackpot events that increase your chances of earning even more.
            </p>
            <p>
              In short, whether you're here for quick entertainment or aiming to become a regular player, V2 Game offers a trusted, all-in-one gaming experience tailored to your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose V3 Game - 4 Benefits Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12" data-testid="section-why-choose-v3">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FED358' }} data-testid="heading-why-choose-v3">
            Why Choose V3 Game?
          </h1>
          <p className="text-sm md:text-base max-w-4xl mb-8" style={{ color: '#FDE4BC' }} data-testid="text-why-choose-description">
            V3 Game is the most trusted online gaming platform in India with thousands of active players enjoying daily bonuses and exciting rewards.
          </p>

          <div className="space-y-6 max-w-4xl">
            {/* Benefit 1 - Quick Registration */}
            <div data-testid="card-benefit-registration">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-benefit-registration">Quick Registration</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-benefit-registration">
                You can complete the registration process in just a few minutes. Simply enter your mobile number, verify OTP, and start playing with instant access to all games.
              </p>
            </div>

            {/* Benefit 2 - Login Bonus & Rewards */}
            <div data-testid="card-benefit-login-bonus">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-benefit-login-bonus">Login Bonus & Rewards</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-benefit-login-bonus">
                Get attractive bonuses every time you log in. Enjoy daily check-in bonuses, referral rewards, spin-the-wheel offers, and special festival bonuses throughout the year.
              </p>
            </div>

            {/* Benefit 3 - Fast & Easy Withdrawals */}
            <div data-testid="card-benefit-withdrawals">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-benefit-withdrawals">Fast & Easy Withdrawals</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-benefit-withdrawals">
                The platform allows fast and hassle-free withdrawals to your verified account. Get your earnings within minutes to UPI, bank account, or Paytm using trusted Indian gateways.
              </p>
            </div>

            {/* Benefit 4 - Secure & Encrypted */}
            <div data-testid="card-benefit-security">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-benefit-security">Secure Platform</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-benefit-security">
                It uses strong data encryption to keep your account and payments safe. Your data is encrypted and all transactions are secure, verified, and protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* V3 Game Features Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12" data-testid="section-v3-features">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FED358' }} data-testid="heading-v3-features">
            V3 Game Features
          </h1>
          <p className="text-sm md:text-base max-w-4xl mb-8" style={{ color: '#FDE4BC' }} data-testid="text-v3-features-intro">
            V3 Game offers exciting features for users who love both entertainment and the opportunity to earn real cash. Here's what makes V3 Game stand out.
          </p>

          <div className="space-y-6 max-w-4xl">
            {/* Feature 1 - Multiple Category Games */}
            <div data-testid="card-feature-games">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-games">Multiple Category Games</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-games">
                Get access to a wide variety of games across different categories like casino, sports, slots, and casual games. Whether skill-based or luck-based, there's something for everyone.
              </p>
            </div>

            {/* Feature 2 - Real Money Winnings */}
            <div data-testid="card-feature-winnings">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-winnings">Real Money Winnings</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-winnings">
                Earn real cash by participating in multiple games. Every game you play offers genuine earning potential with transparent and fair gameplay.
              </p>
            </div>

            {/* Feature 3 - Daily Bonuses & Offers */}
            <div data-testid="card-feature-bonuses">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-bonuses">Daily Bonuses & Offers</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-bonuses">
                Get daily login bonuses, referral rewards, and seasonal offers that increase your chances of winning. These bonuses help boost your earnings over time.
              </p>
            </div>

            {/* Feature 4 - Instant Withdrawal System */}
            <div data-testid="card-feature-withdrawal">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-withdrawal">Instant Withdrawal System</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-withdrawal">
                Easily withdraw your winnings via bank transfer, UPI, or other supported methods. Fast, secure, and available 24/7 with minimum withdrawal limits.
              </p>
            </div>

            {/* Feature 5 - Referral Program */}
            <div data-testid="card-feature-referral">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-referral">Referral Program</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-referral">
                Earn extra money by inviting friends to the platform. Share your unique referral code and earn a commission whenever your referrals play.
              </p>
            </div>

            {/* Feature 6 - Secure and User-Friendly App */}
            <div data-testid="card-feature-secure">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-secure">Secure & User-Friendly App</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-secure">
                The V3 app is easy to use with smooth gameplay. It has SSL encryption for safety, ensuring your personal and financial data remains protected.
              </p>
            </div>

            {/* Feature 7 - 24x7 Customer Support */}
            <div data-testid="card-feature-support">
              <h1 className="text-base md:text-lg font-bold mb-2" style={{ color: '#FED358' }} data-testid="heading-feature-support">24×7 Customer Support</h1>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: '#FDE4BC' }} data-testid="text-feature-support">
                Round-the-clock customer support through chat and email ensures a hassle-free experience. We're here whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsible Gaming Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12" data-testid="section-responsible-gaming">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#FED358' }} data-testid="heading-responsible-gaming">
            Responsible Gaming at V3 Game
          </h1>
          <div className="space-y-4 max-w-4xl" style={{ color: '#FDE4BC' }} data-testid="text-responsible-gaming">
            <p className="text-sm md:text-base leading-relaxed">
              We are committed to promoting a safe and enjoyable gaming environment. Our platform is designed for entertainment purposes, and we strongly encourage all users to play responsibly.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              Always set limits, stay in control, and never chase losses. If you feel that your gaming habits are affecting your personal life, finances, or relationships, it may be time to take a break or seek help.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              We also discourage underage users from accessing our platform and strictly prohibit anyone below the legal age from registering or playing.
            </p>
            <p className="text-sm md:text-base leading-relaxed font-semibold" style={{ color: '#FED358' }}>
              Read our full Responsible Gaming policy for tips, self-assessment tools, and support resources.
            </p>
          </div>
        </div>
      </div>

      {/* App Information Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 pb-8">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: '#fff' }}>
            {/* Purple Gradient Header */}
            <div className="py-4 px-6" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-bold text-white">App Information</h3>
              </div>
            </div>
            {/* Info Rows */}
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(102,126,234,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#667eea' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">App Name</span>
                </div>
                <span className="font-semibold text-gray-800">V3 Game</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(46,204,113,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#2ECC71' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">Size</span>
                </div>
                <span className="font-semibold text-gray-800">2.08 MB</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(155,89,182,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#9B59B6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">Invite Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: '#667eea' }}>7532630349</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('7532630349');
                    }}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    data-testid="button-copy-invite-code"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(231,76,60,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#E74C3C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">Games</span>
                </div>
                <span className="font-semibold text-gray-800">500+</span>
              </div>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(52,152,219,0.1)' }}>
                    <svg className="w-4 h-4" style={{ color: '#3498DB' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">Website</span>
                </div>
                <a href="https://www.v3gameb.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: '#3498DB' }}>www.v3gameb.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-12" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #1a1a2e 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ color: '#FED358' }}>
              V3 Game Guides & Tips
            </h2>
            <p className="text-sm md:text-base" style={{ color: '#FDE4BC' }}>
              Learn everything about V3 Game - Registration, Login, Withdrawals & More
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogArticles.map((article) => (
              <Link 
                key={article.id}
                href={`/${article.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl block"
                data-testid={`card-blog-${article.id}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span 
                    className="mt-3 text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 inline-block"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}
                  >
                    Read More
                  </span>
                </div>
              </Link>
            ))}
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
                      loading="lazy"
                      decoding="async"
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
