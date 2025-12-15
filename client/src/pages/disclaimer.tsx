import { Link } from "wouter";
import { ArrowLeft, Scale, AlertTriangle, Shield, FileText, Clock, Users } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function DisclaimerPage() {
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
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(254,211,88,0.15) 0%, transparent 50%)' }}></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute top-40 right-10 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)' }}>
            <Scale className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: '#FED358' }}>
            Legal Disclaimer
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#FDE4BC' }}>
            Important information about our services and your responsibilities
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#FDE4BC' }}>
          <Clock className="w-4 h-4" />
          <span>Last Updated: December 2024</span>
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative p-6 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(255,107,53,0.1) 100%)', borderLeft: '4px solid #FED358' }}>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <AlertTriangle className="w-7 h-7 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FED358' }}>Important Notice</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Our VIP App provides predictions based on statistical analysis and past lottery results. These predictions serve as a guide only and are not guaranteed outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Sections */}
      <div className="max-w-4xl mx-auto px-6 mb-16 space-y-6">
        {/* Risk Notice */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #FED358)' }}>
              <AlertTriangle className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FF6B35' }}>Risk Notice</h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#FDE4BC' }}>
                Participation in lottery games involves significant financial risk. It is crucial that you:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FF6B35' }}>
                    <span className="text-black text-xs font-bold">1</span>
                  </div>
                  <span style={{ color: '#FDE4BC' }}>Play responsibly and within your financial limits</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FF6B35' }}>
                    <span className="text-black text-xs font-bold">2</span>
                  </div>
                  <span style={{ color: '#FDE4BC' }}>Never bet more than you can afford to lose</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FF6B35' }}>
                    <span className="text-black text-xs font-bold">3</span>
                  </div>
                  <span style={{ color: '#FDE4BC' }}>Understand that predictions are guides, not guarantees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Platform Disclaimer */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Platform Disclaimer</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                V3 GAME VIP provides prediction services for third-party gaming platforms. We are not affiliated with, endorsed by, or responsible for any external gaming platforms. If a third-party platform shuts down, experiences technical issues, or fails to honor payouts, V3 GAME VIP bears no responsibility for any resulting losses.
              </p>
            </div>
          </div>
        </div>

        {/* User Responsibility */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #FED358)' }}>
              <Users className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FF6B35' }}>User Responsibility</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                By using our services, you acknowledge that you fully understand the risks involved in lottery gaming. You agree to take complete responsibility for your decisions and actions. V3 GAME VIP serves as a prediction tool and the final decision to participate in any gaming activity rests solely with you.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Terms */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
              <FileText className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Terms of Use</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Our predictions are meant to serve as a guide and not to encourage addiction. We encourage responsible gaming practices. By using V3 GAME VIP, you confirm that you are of legal age to participate in gaming activities in your jurisdiction and that you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Remember Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative p-8 rounded-3xl overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.1) 0%, rgba(255,107,53,0.05) 100%)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}>
            <span className="text-3xl">💡</span>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#FED358' }}>Remember</h3>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#FDE4BC' }}>
            Lottery games are a form of gambling and involve inherent risk. Always make informed choices, set limits for yourself, and never chase losses. Gaming should be entertaining, not stressful.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative p-10 rounded-3xl overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(255,107,53,0.1) 100%)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(254,211,88,0.4) 0%, transparent 50%)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Questions?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#FDE4BC' }}>
              Contact our support team for any clarifications about our services.
            </p>
            <Link href="/">
              <a 
                className="inline-block px-10 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)', color: '#1a1520' }}
                data-testid="button-back-home"
              >
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
