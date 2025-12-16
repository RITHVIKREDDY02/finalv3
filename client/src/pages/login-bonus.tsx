import { Link } from "wouter";
import { Home, Gift, Star, Zap, Crown } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";

export default function LoginBonusPage() {
  const bonuses = [
    {
      day: 1,
      bonus: "Welcome Bonus",
      description: "Get instant VIP access for 24 hours",
      icon: Gift
    },
    {
      day: 3,
      bonus: "3-Day Streak",
      description: "Unlock exclusive prediction tips",
      icon: Star
    },
    {
      day: 7,
      bonus: "Weekly Champion",
      description: "Access to premium high-accuracy predictions",
      icon: Zap
    },
    {
      day: 15,
      bonus: "Half Month Hero",
      description: "Personal support from expert analysts",
      icon: Crown
    },
    {
      day: 30,
      bonus: "Monthly Master",
      description: "Lifetime VIP benefits + bonus rewards",
      icon: Crown
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
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Login Bonus</h1>
            <p className="text-lg" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Daily rewards for our loyal VIP members
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bonuses.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.day}
                  className="rounded-2xl p-6 text-center transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(254, 211, 88, 0.2)'
                  }}
                  data-testid={`bonus-day-${item.day}`}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
                  >
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  <div 
                    className="text-sm font-medium mb-2"
                    style={{ color: '#FED358' }}
                  >
                    Day {item.day}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#FDE4BC' }}>
                    {item.bonus}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div 
            className="mt-12 rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(254, 211, 88, 0.1) 0%, rgba(251, 94, 4, 0.1) 100%)',
              border: '2px solid #FED358'
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#FED358' }}>
              Start Earning Bonuses Today!
            </h2>
            <p className="mb-6" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Join our VIP program and unlock daily rewards with every login
            </p>
            <a 
              href="https://t.me/Earn_With_Milind_77" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)', color: '#000' }}
              data-testid="button-claim-bonus"
            >
              <Gift className="text-xl" />
              Claim Your Bonus
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
