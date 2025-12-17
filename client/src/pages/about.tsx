import { Link } from "wouter";
import Footer from "@/components/footer";

const logoPath = "/images/logo.webp";

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)' }}>
      <nav 
        className="fixed top-0 left-0 right-0 px-4 shadow-lg z-50"
        style={{ 
          height: '60px',
          background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)',
          borderBottom: '2px solid #0b3681'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <Link href="/">
            <img src={logoPath} alt="V3 GAME Logo" className="w-auto object-contain h-5 md:h-7 cursor-pointer" />
          </Link>
          <Link 
            href="/"
            className="px-4 py-2 rounded-full text-black font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{ background: 'linear-gradient(180deg, #FED358, #f5a623)' }}
          >
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-48 md:h-56 rounded-3xl overflow-hidden mb-8" style={{ background: 'linear-gradient(135deg, #FED358 0%, #f5a623 100%)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-3">🏆</div>
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">About V3 GAME VIP</h1>
              </div>
            </div>
          </div>

          <div className="relative mb-10 p-6 md:p-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.15) 0%, rgba(254,211,88,0.05) 100%)', border: '1px solid rgba(254,211,88,0.3)' }}>
            <div className="absolute top-2 left-4 text-5xl opacity-30" style={{ color: '#FED358' }}>"</div>
            <p className="text-xl md:text-2xl font-semibold text-center italic relative z-10" style={{ color: '#FDE4BC' }}>
              Life is a gamble and We live only once, so let's have fun at V3 GAME VIP!
            </p>
            <div className="absolute bottom-2 right-4 text-5xl opacity-30" style={{ color: '#FED358' }}>"</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.3)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #FED358, #f5a623)' }}>
                  <span className="text-black text-xl">🎯</span>
                </div>
                <h3 className="font-bold text-xl" style={{ color: '#FED358' }}>100% Success Rate</h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Our advanced AI algorithm delivers accurate predictions every time, helping you make smarter decisions.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white text-xl">🤖</span>
                </div>
                <h3 className="font-bold text-xl" style={{ color: '#3498DB' }}>AI-Powered</h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Expert data analysts and cutting-edge algorithms work around the clock to provide you with the best predictions.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="font-bold text-xl" style={{ color: '#3498DB' }}>Instant Results</h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Get predictions for color, size, and number in seconds. No waiting, no delays - just instant winning insights.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.3)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #FED358, #f5a623)' }}>
                  <span className="text-black text-xl">💬</span>
                </div>
                <h3 className="font-bold text-xl" style={{ color: '#FED358' }}>24/7 Support</h3>
              </div>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Email and live chat support always available. Our dedicated team is here to help you anytime.
              </p>
            </div>
          </div>

          <div className="mb-10 space-y-6 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-2xl font-bold" style={{ color: '#FED358' }}>Who We Are</h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
              Welcome to <span className="font-bold" style={{ color: '#FED358' }}>V3 GAME VIP</span>, the leading platform for Wingo lottery predictions. Our team of experts analyzes past draws and player behavior to deliver unmatched accuracy in every prediction.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
              We believe everyone deserves a chance to win big. That's why we've made our platform simple and accessible. Just select your game, click 'predict', and receive your winning predictions instantly!
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
              Our mission is to provide reliable, accurate, and instant predictions to help our users make informed decisions. Join thousands of satisfied users who trust V3 GAME VIP for their gaming needs.
            </p>
          </div>

          <div className="relative p-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.2) 0%, rgba(254,211,88,0.1) 100%)' }}>
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(254,211,88,0.5) 0%, transparent 50%)' }}></div>
            <div className="relative z-10 text-center">
              <h3 className="font-bold text-2xl md:text-3xl mb-4" style={{ color: '#FED358' }}>🚀 Ready to Start Winning?</h3>
              <p className="text-base mb-6" style={{ color: '#FDE4BC' }}>Join V3 GAME VIP today and experience the best predictions!</p>
              <a 
                href="https://www.v3gameb.com/#/pages/login/register?invitationCode=7532630349"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(135deg, #FED358 0%, #f5a623 100%)', color: '#000c1c' }}
                data-testid="button-start-predicting"
              >
                Start Predicting Now!
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
