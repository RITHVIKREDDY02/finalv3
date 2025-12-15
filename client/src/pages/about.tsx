import { Link } from "wouter";
import { ArrowLeft, Target, Bot, Zap, MessageCircle, Trophy, Users, Shield, Star } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000c1c 0%, #0a1628 50%, #000c1c 100%)' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'linear-gradient(180deg, rgba(0,12,28,0.98) 0%, rgba(0,12,28,0.9) 100%)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
              <ArrowLeft className="w-5 h-5" />
              <img src={logoPath} alt="V3 GAME Logo" className="h-6" />
            </a>
          </Link>
          <a 
            href="https://t.me/V3Games" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0088cc, #0077b5)' }}
          >
            <FaTelegram className="text-white" />
            <span className="text-white text-sm font-medium">Join Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(254,211,88,0.15) 0%, transparent 50%)' }}></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute top-40 right-10 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)' }}>
            <Trophy className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: '#FED358' }}>
            About V3 GAME VIP
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#FDE4BC' }}>
            The leading platform for winning lottery predictions powered by AI
          </p>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative p-8 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.1) 0%, rgba(255,107,53,0.05) 100%)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="absolute top-4 left-6 text-7xl opacity-20" style={{ color: '#FED358' }}>"</div>
          <p className="text-2xl md:text-3xl font-light text-center italic relative z-10 py-4" style={{ color: '#FDE4BC' }}>
            Life is a gamble and we live only once, so let's have fun at V3 GAME VIP!
          </p>
          <div className="absolute bottom-4 right-6 text-7xl opacity-20" style={{ color: '#FED358' }}>"</div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid rgba(46,204,113,0.3)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#2ECC71' }}>100%</div>
            <div className="text-sm" style={{ color: '#FDE4BC' }}>Success Rate</div>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#3498DB' }}>50K+</div>
            <div className="text-sm" style={{ color: '#FDE4BC' }}>VIP Members</div>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(155,89,182,0.1)', border: '1px solid rgba(155,89,182,0.3)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#9B59B6' }}>24/7</div>
            <div className="text-sm" style={{ color: '#FDE4BC' }}>Live Support</div>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.3)' }}>
            <div className="text-4xl font-black mb-2" style={{ color: '#FED358' }}>5+</div>
            <div className="text-sm" style={{ color: '#FDE4BC' }}>Game Types</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#FED358' }}>Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, rgba(46,204,113,0.1) 0%, rgba(39,174,96,0.05) 100%)', border: '1px solid rgba(46,204,113,0.2)' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}>
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#2ECC71' }}>100% Accuracy</h3>
                <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                  Our advanced AI algorithm analyzes patterns to deliver precise predictions every single time.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, rgba(52,152,219,0.1) 0%, rgba(41,128,185,0.05) 100%)', border: '1px solid rgba(52,152,219,0.2)' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#3498DB' }}>AI-Powered</h3>
                <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                  Expert data analysts combined with cutting-edge machine learning algorithms work for you.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, rgba(155,89,182,0.1) 0%, rgba(142,68,173,0.05) 100%)', border: '1px solid rgba(155,89,182,0.2)' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #9B59B6, #8E44AD)' }}>
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#9B59B6' }}>Instant Results</h3>
                <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                  Get predictions for color, size, and number in just seconds with real-time updates.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.1) 0%, rgba(255,107,53,0.05) 100%)', border: '1px solid rgba(254,211,88,0.2)' }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
                <MessageCircle className="w-7 h-7 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#FED358' }}>24/7 Support</h3>
                <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                  Email and live chat support available around the clock to assist you anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#FED358' }}>Our Mission</h2>
          <div className="space-y-4" style={{ color: '#FDE4BC' }}>
            <p className="text-lg leading-relaxed">
              Welcome to <span className="font-bold" style={{ color: '#FED358' }}>V3 GAME VIP</span>, the premier online platform for predicting winning numbers in popular Wingo lottery games. Our team of expert data scientists and AI analysts have developed a revolutionary algorithm that analyzes past lottery draws and player behavior patterns.
            </p>
            <p className="text-lg leading-relaxed">
              At V3 GAME VIP, we believe everyone deserves a chance to win big. Simply visit our prediction section, select your game platform, click 'predict', and receive your personalized predictions for the winning color, size, and number.
            </p>
            <p className="text-lg leading-relaxed">
              Join thousands of satisfied VIP members who trust us for their daily predictions. Don't wait – start your winning journey today!
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#FED358' }}>Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)' }}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#E74C3C' }}>Trust & Security</h3>
            <p className="text-sm" style={{ color: '#FDE4BC' }}>Your data and predictions are always protected with us.</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#2ECC71' }}>Community First</h3>
            <p className="text-sm" style={{ color: '#FDE4BC' }}>Building a winning community together, one prediction at a time.</p>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <Star className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: '#FED358' }}>Excellence</h3>
            <p className="text-sm" style={{ color: '#FDE4BC' }}>Striving for perfection in every prediction we deliver.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative p-10 rounded-3xl overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(255,107,53,0.1) 100%)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(254,211,88,0.4) 0%, transparent 50%)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Ready to Start Winning?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#FDE4BC' }}>
              Join our VIP community today and get access to exclusive predictions.
            </p>
            <Link href="/">
              <a 
                className="inline-block px-10 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                data-testid="button-join-vip"
              >
                Join VIP Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
