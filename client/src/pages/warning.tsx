import { Link } from "wouter";
import { ArrowLeft, ShieldAlert, Eye, AlertOctagon, Brain, CheckCircle, XCircle, Lock } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function WarningPage() {
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
            href="https://t.me/Earn_With_Milind_77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}
          >
            <FaTelegram className="text-black" />
            <span className="text-black text-sm font-medium">Join Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,53,0.2) 0%, transparent 50%)' }}></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute top-40 right-10 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FED358 100%)' }}>
            <ShieldAlert className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: '#FF6B35' }}>
            Security Warning
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#FDE4BC' }}>
            Stay informed about platform manipulation and how we protect you
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative p-6 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.12) 0%, rgba(254,211,88,0.08) 100%)', borderLeft: '4px solid #FF6B35' }}>
          <p className="text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
            At V3 GAME VIP, we believe in empowering our users with knowledge. Understanding how gaming platforms operate—and how they might manipulate outcomes—is essential for making informed decisions. This is where our expertise becomes invaluable.
          </p>
        </div>
      </div>

      {/* How We Protect You */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <Lock className="w-7 h-7 text-black" />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: '#FED358' }}>How We Protect You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FED358' }}>
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold" style={{ color: '#FED358' }}>API Monitoring</h4>
              </div>
              <p className="text-sm" style={{ color: '#FDE4BC' }}>
                Our sophisticated systems constantly monitor platforms for any signs of data manipulation or irregularities.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FED358' }}>
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold" style={{ color: '#FED358' }}>Pattern Detection</h4>
              </div>
              <p className="text-sm" style={{ color: '#FDE4BC' }}>
                Advanced algorithms detect patterns and anomalies that could indicate unfair or manipulated practices.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FED358' }}>
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold" style={{ color: '#FED358' }}>Multi-Factor Analysis</h4>
              </div>
              <p className="text-sm" style={{ color: '#FDE4BC' }}>
                Predictions based on comprehensive analysis of multiple factors, not just platform-provided data.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FED358' }}>
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <h4 className="font-bold" style={{ color: '#FED358' }}>Real-Time Updates</h4>
              </div>
              <p className="text-sm" style={{ color: '#FDE4BC' }}>
                Continuous updates ensure you always have the latest insights and most accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Out For */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B35, #FED358)' }}>
              <AlertOctagon className="w-7 h-7 text-black" />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: '#FF6B35' }}>Potential Manipulation Tactics</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,107,53,0.1)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FF6B35' }}>
                  <XCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: '#FF6B35' }}>Controlled "Randomness"</h4>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>
                    Some platforms may influence when and how their "random" number generation is applied, creating the illusion of fairness while actually controlling outcomes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,107,53,0.1)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FF6B35' }}>
                  <XCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: '#FF6B35' }}>Hidden Algorithm Changes</h4>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>
                    Sudden, undisclosed changes to algorithms can unfairly shift odds against players without any transparency or warning.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,107,53,0.1)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FF6B35' }}>
                  <XCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: '#FF6B35' }}>Selective Payout Practices</h4>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>
                    Some platforms may delay or withhold payouts without clear explanation, especially for larger wins or frequent winners.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,107,53,0.1)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FF6B35' }}>
                  <XCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: '#FF6B35' }}>Data Manipulation</h4>
                  <p className="text-sm" style={{ color: '#FDE4BC' }}>
                    Platforms using SHA-256 or similar systems can potentially manipulate the input data to achieve desired outcomes while appearing legitimate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stay Informed */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <Brain className="w-7 h-7 text-black" />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: '#FED358' }}>Stay Informed, Play Smart</h2>
          </div>
          
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#FDE4BC' }}>
            We urge all users to approach gaming platforms with a critical eye. Always verify a platform's credibility before engaging and research their reputation thoroughly. With V3 GAME VIP by your side, you're equipped with the insights needed to make informed decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(254,211,88,0.15)' }}>
              <Eye className="w-6 h-6 flex-shrink-0" style={{ color: '#FED358' }} />
              <span className="text-sm" style={{ color: '#FDE4BC' }}>Research platform reputation before playing</span>
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(254,211,88,0.15)' }}>
              <Eye className="w-6 h-6 flex-shrink-0" style={{ color: '#FED358' }} />
              <span className="text-sm" style={{ color: '#FDE4BC' }}>Read user reviews and community feedback</span>
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(254,211,88,0.15)' }}>
              <Eye className="w-6 h-6 flex-shrink-0" style={{ color: '#FED358' }} />
              <span className="text-sm" style={{ color: '#FDE4BC' }}>Check for licensing and regulation</span>
            </div>
            <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(254,211,88,0.15)' }}>
              <Eye className="w-6 h-6 flex-shrink-0" style={{ color: '#FED358' }} />
              <span className="text-sm" style={{ color: '#FDE4BC' }}>Verify payout history and reliability</span>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge is Power */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative p-8 rounded-3xl overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(255,107,53,0.1) 100%)', border: '1px solid rgba(254,211,88,0.3)' }}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(254,211,88,0.5) 0%, transparent 60%)' }}></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#FED358' }}>💡 Knowledge is Power</h3>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#FDE4BC' }}>
              Especially in the world of online lotteries. Stay informed, stay protected, and maximize your chances of success with V3 GAME VIP.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative p-10 rounded-3xl overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.1) 0%, rgba(255,107,53,0.05) 100%)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(254,211,88,0.3) 0%, transparent 50%)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Ready to Play Safe?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#FDE4BC' }}>
              Use our VIP predictions and stay one step ahead of platform manipulation.
            </p>
            <Link href="/">
              <a 
                className="inline-block px-10 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                data-testid="button-back-home"
              >
                Start Predicting Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
