import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Crown, Sparkles, Trophy, Rocket, ArrowRight } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationDialog({ isOpen, onClose }: RegistrationDialogProps) {
  const handleStartButtonClick = () => {
    window.open("https://www.v3gameb.com/#/pages/login/register?invitationCode=7532630349", "_blank");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/Earn_With_Milind_77", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden border-0 p-0 rounded-3xl shadow-2xl bg-transparent">
        
        {/* Glass morphism container */}
        <div className="relative overflow-hidden rounded-3xl" style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(254, 211, 88, 0.3)'
        }}>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)' }}></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-15 animate-pulse" style={{ background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)', animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 -right-8 w-24 h-24 rounded-full opacity-10 animate-pulse" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', animationDelay: '0.5s' }}></div>
          </div>

          {/* Header with floating icon */}
          <div className="relative pt-8 pb-4 px-6 text-center">
            {/* Floating crown icon */}
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center transform rotate-3 transition-transform hover:rotate-0 hover:scale-110 duration-300" 
                style={{ 
                  background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)',
                  boxShadow: '0 10px 40px rgba(254, 211, 88, 0.4)'
                }}>
                <Crown className="w-10 h-10 text-black" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            
            <DialogTitle className="text-2xl font-black tracking-tight mb-2" style={{ color: '#FED358' }}>
              JOIN VIP ACCESS
            </DialogTitle>
            <p className="text-sm font-medium" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Unlock exclusive winning predictions
            </p>
          </div>

          {/* Benefits grid */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(254, 211, 88, 0.15) 0%, rgba(254, 211, 88, 0.05) 100%)',
                  border: '1px solid rgba(254, 211, 88, 0.2)'
                }}>
                <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: '#FED358' }} />
                <p className="text-xs font-bold" style={{ color: '#FDE4BC' }}>100% Accurate</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(253, 228, 188, 0.6)' }}>Predictions</p>
              </div>
              <div className="p-4 rounded-2xl text-center transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 107, 53, 0.05) 100%)',
                  border: '1px solid rgba(255, 107, 53, 0.2)'
                }}>
                <Rocket className="w-8 h-8 mx-auto mb-2" style={{ color: '#FF6B35' }} />
                <p className="text-xs font-bold" style={{ color: '#FDE4BC' }}>Instant</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(253, 228, 188, 0.6)' }}>Results</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="px-6 pb-4">
            <div className="p-4 rounded-2xl" style={{ 
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <p className="text-xs font-semibold mb-3" style={{ color: '#FED358' }}>HOW TO GET STARTED</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                    style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)', color: '#000' }}>1</div>
                  <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>Register on the platform</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                    style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)', color: '#000' }}>2</div>
                  <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>Join our Telegram channel</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" 
                    style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)', color: '#000' }}>3</div>
                  <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>Start winning today!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 space-y-3">
            <Button
              className="w-full h-12 font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 border-0"
              onClick={handleStartButtonClick}
              style={{ 
                background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(254, 211, 88, 0.4)'
              }}
            >
              REGISTER NOW
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              className="w-full h-12 font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              onClick={handleTelegramClick}
              style={{ 
                background: 'linear-gradient(135deg, #0088cc 0%, #0066aa 100%)',
                color: '#fff',
                border: 'none'
              }}
            >
              <FaTelegram className="w-5 h-5" />
              JOIN TELEGRAM
            </Button>
            
            <p className="text-center text-xs pt-2" style={{ color: 'rgba(253, 228, 188, 0.5)' }}>
              Join 50,000+ VIP members winning daily
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
