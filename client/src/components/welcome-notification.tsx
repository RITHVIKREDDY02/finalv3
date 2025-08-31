import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import depositBonusImage from "@assets/202505241645242463002_1756622465525.png";
import closeIcon from "@assets/image_1756622673827.png";

interface WelcomeNotificationProps {
  onRegisterClick: () => void;
}

export default function WelcomeNotification({ onRegisterClick }: WelcomeNotificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome notification before
    const hasSeenWelcome = localStorage.getItem("tashan_welcome_seen");
    
    if (!hasSeenWelcome) {
      // Show the notification after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem("tashan_welcome_seen", "true");
  };

  const handleRegister = () => {
    handleClose();
    onRegisterClick();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-4xl mx-auto my-4 w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden border-0 p-0 rounded-2xl shadow-2xl bg-transparent [&>button]:hidden"
      >
        <div className="relative">
          {/* Main promotional image */}
          <img 
            src={depositBonusImage} 
            alt="V3 GAME Deposit Bonus - Welcome Offer" 
            className="w-full h-auto object-cover rounded-2xl"
          />
          
          {/* Close button positioned at top-right */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <img 
              src={closeIcon} 
              alt="Close" 
              className="w-full h-full object-contain"
            />
          </button>
          
          {/* Register button positioned at bottom */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={handleRegister}
              className="px-8 py-3 text-lg font-bold rounded-full custom-button shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              REGISTER NOW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}