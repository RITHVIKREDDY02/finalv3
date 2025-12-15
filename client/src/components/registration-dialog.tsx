import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Star, Shield, Zap, Users, ExternalLink } from "lucide-react";
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

  const handleHelpClick = () => {
    window.open("https://t.me/Earn_With_Milind_77", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg mx-auto my-4 w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto border-2 p-0 rounded-2xl shadow-2xl" 
        style={{ 
          backgroundColor: '#231C21',
          borderColor: '#FED358',
          boxShadow: '0 0 30px rgba(254, 211, 88, 0.3)'
        }}>
        
        {/* Header */}
        <div className="relative p-4 rounded-t-2xl bg-banner-gradient border-b border-accent-gold/30">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: '#FED358',
                boxShadow: '0 0 15px rgba(254, 211, 88, 0.4)'
              }}>
              <Star className="w-6 h-6 text-black" />
            </div>
            <DialogTitle className="text-lg font-bold light-gold drop-shadow-lg">
              JOIN VIP
            </DialogTitle>
            <DialogDescription className="warm-gold font-medium text-center text-sm">
              Get Exclusive Predictions
            </DialogDescription>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Premium Features */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-banner-gradient p-2 rounded-lg border border-accent-gold/30 text-center">
              <Shield className="w-5 h-5 warm-gold mx-auto mb-1" />
              <p className="text-xs font-bold light-gold">Secure</p>
            </div>
            <div className="bg-banner-gradient p-2 rounded-lg border border-accent-gold/30 text-center">
              <Zap className="w-5 h-5 warm-gold mx-auto mb-1" />
              <p className="text-xs font-bold light-gold">Fast</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-banner-gradient p-3 rounded-lg border border-accent-gold/50">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FED358' }}>
                <Users className="w-3 h-3 text-black" />
              </div>
              <div>
                <h3 className="font-bold light-gold mb-1 text-sm">How to Join</h3>
                <p className="text-xs warm-gold leading-relaxed">
                  1. Register on the platform using our link
                </p>
                <p className="text-xs warm-gold leading-relaxed">
                  2. Contact us on Telegram for VIP access
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              className="w-full h-10 font-bold text-sm rounded-lg transition-all duration-200 custom-button flex items-center justify-center gap-2"
              onClick={handleStartButtonClick}
            >
              <ExternalLink className="w-4 h-4" />
              REGISTER NOW
            </Button>
            
            <Button
              className="w-full h-10 font-semibold text-sm rounded-lg btn-body-bg flex items-center justify-center gap-2"
              onClick={handleTelegramClick}
            >
              <FaTelegram className="w-4 h-4" />
              JOIN TELEGRAM
            </Button>
            
            <Button
              className="w-full h-9 font-semibold text-xs rounded-lg"
              variant="outline"
              onClick={handleHelpClick}
              style={{ borderColor: '#FED358', color: '#FED358' }}
            >
              NEED HELP?
            </Button>
            
            <div className="text-center">
              <p className="text-xs accent-gold">
                Join our VIP community for exclusive predictions
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
