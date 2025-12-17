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
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight">V3 Game Login App & Lottery Download</h1>
              </div>
            </div>
          </div>

          <div className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#FED358' }}>Complete Guide for Indian Users</h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
              Online gaming and lottery platforms have gained massive popularity across India in recent years. Among these, the V3 Game Login App has quickly become a popular choice for players who enjoy games of skill, entertainment, and luck-based lotteries.
            </p>
          </div>

          <div className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#3498DB' }}>How to Download the V3 Game App in India?</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#FDE4BC' }}>
              Downloading the V3 Game login app apk is easy and quick. Since it may not be available directly on the Google Play Store, users can follow these steps:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>Visit the official V3 Game website on your mobile browser.</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>Find the download link for the V3 Game login apk.</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>Tap the link to download the file.</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>Once downloaded, go to your phone settings and enable "Install from Unknown Sources."</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>Open the apk file and install it on your device.</p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
                  <span className="text-white font-bold text-sm">6</span>
                </div>
                <p className="text-base" style={{ color: '#FDE4BC' }}>After installation, launch the app and complete the V3 Game login process using your registered mobile number or email.</p>
              </div>
            </div>
          </div>

          <div className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.3)' }}>
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#FED358' }}>V3 Game Login Lottery – How It Works?</h2>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#FDE4BC' }}>
              The V3 Game login lottery section allows players to buy digital tickets for upcoming draws. Each lottery has a fixed schedule, and players can view results through their login dashboard. The more tickets you purchase, the higher your chances of winning.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#FDE4BC' }}>
              The lottery operates transparently, displaying winners and results publicly within the app.
            </p>
          </div>

          <div className="mb-10 p-6 md:p-8 rounded-2xl" style={{ background: 'rgba(52,152,219,0.1)', border: '1px solid rgba(52,152,219,0.3)' }}>
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#3498DB' }}>Why Choose the V3 Game Login App in India?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📱</span>
                  <h3 className="font-bold" style={{ color: '#FED358' }}>Convenience</h3>
                </div>
                <p className="text-sm" style={{ color: '#FDE4BC' }}>Easy to access from anywhere through mobile login or apk download.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🎮</span>
                  <h3 className="font-bold" style={{ color: '#FED358' }}>Entertainment</h3>
                </div>
                <p className="text-sm" style={{ color: '#FDE4BC' }}>Offers both gaming and lottery experiences in one place.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🔒</span>
                  <h3 className="font-bold" style={{ color: '#FED358' }}>Security</h3>
                </div>
                <p className="text-sm" style={{ color: '#FDE4BC' }}>Uses advanced data protection systems.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">✅</span>
                  <h3 className="font-bold" style={{ color: '#FED358' }}>Transparency</h3>
                </div>
                <p className="text-sm" style={{ color: '#FDE4BC' }}>Clear rules and visible results for all lottery draws.</p>
              </div>
              <div className="p-4 rounded-xl md:col-span-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📲</span>
                  <h3 className="font-bold" style={{ color: '#FED358' }}>Accessibility</h3>
                </div>
                <p className="text-sm" style={{ color: '#FDE4BC' }}>Works well on Android devices with low system requirements.</p>
              </div>
            </div>
          </div>

          <div className="relative p-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(254,211,88,0.2) 0%, rgba(254,211,88,0.1) 100%)' }}>
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(254,211,88,0.5) 0%, transparent 50%)' }}></div>
            <div className="relative z-10 text-center">
              <h3 className="font-bold text-2xl md:text-3xl mb-4" style={{ color: '#FED358' }}>Download V3 Game App Now!</h3>
              <p className="text-base mb-6" style={{ color: '#FDE4BC' }}>Join thousands of Indian users and start playing today!</p>
              <a 
                href="https://www.v3gameb.com/#/pages/login/register?invitationCode=7532630349"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
                style={{ background: 'linear-gradient(135deg, #FED358 0%, #f5a623 100%)', color: '#000c1c' }}
                data-testid="button-download-app"
              >
                Download & Register Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
