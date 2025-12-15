import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Crown, ArrowRight } from "lucide-react";
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
          
          {/* Header with icon */}
          <div className="relative pt-8 pb-4 px-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" 
                style={{ 
                  background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)',
                  boxShadow: '0 10px 40px rgba(254, 211, 88, 0.4)'
                }}>
                <Crown className="w-10 h-10 text-black" />
              </div>
            </div>
            
            <DialogTitle className="text-2xl font-black tracking-tight mb-2" style={{ color: '#FED358' }}>
              JOIN VIP ACCESS
            </DialogTitle>
            <p className="text-sm font-medium" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Unlock exclusive winning predictions
            </p>
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
                  <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>Complete your profile</p>
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
              className="w-full h-12 font-bold text-base rounded-xl flex items-center justify-center gap-2 border-0"
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
              className="w-full h-12 font-semibold text-base rounded-xl flex items-center justify-center gap-2"
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
