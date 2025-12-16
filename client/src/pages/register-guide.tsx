import { Link } from "wouter";
import { Home, CheckCircle } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";

export default function RegisterGuidePage() {
  const steps = [
    {
      step: 1,
      title: "Visit V3 GAME Platform",
      description: "Go to the official V3 GAME website and click on the Register button."
    },
    {
      step: 2,
      title: "Fill Registration Form",
      description: "Enter your phone number, create a strong password, and provide required details."
    },
    {
      step: 3,
      title: "Verify Your Account",
      description: "Complete the verification process through OTP sent to your phone."
    },
    {
      step: 4,
      title: "Join VIP Telegram",
      description: "Connect with our Telegram group to receive VIP predictions and support."
    },
    {
      step: 5,
      title: "Make First Deposit",
      description: "Add funds to your account to start receiving premium predictions."
    },
    {
      step: 6,
      title: "Start Winning",
      description: "Follow our expert predictions and start your winning journey!"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'rgba(0,12,28,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(254,211,88,0.15)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
            <Home className="w-5 h-5" style={{ color: '#FED358' }} />
            <span className="text-sm font-medium" style={{ color: '#FED358' }}>Home</span>
          </Link>
          <a 
            href="https://t.me/Earn_With_Milind_77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: '#FED358' }}
          >
            <FaTelegram className="text-black" />
            <span className="text-black text-sm font-medium">Join Us</span>
          </a>
        </div>
      </nav>

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Register Guide</h1>
            <p className="text-lg" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Follow these simple steps to join V3 GAME VIP
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((item) => (
              <div 
                key={item.step}
                className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(254, 211, 88, 0.2)'
                }}
                data-testid={`step-${item.step}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ background: '#FED358', color: '#000' }}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#FDE4BC' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                      {item.description}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#4ade80' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://t.me/Earn_With_Milind_77" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)', color: '#000' }}
              data-testid="button-join-now"
            >
              <FaTelegram className="text-2xl" />
              Join VIP Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
