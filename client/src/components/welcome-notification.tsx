import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import depositBonusImage from "@assets/202505241645242463002_1756622465525.png";
import closeIcon from "@assets/download_1756623183150.png";

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
        <VisuallyHidden>
          <DialogTitle>Welcome Bonus Notification</DialogTitle>
          <DialogDescription>V3 GAME Deposit Bonus Welcome Offer</DialogDescription>
        </VisuallyHidden>
        
        <div className="space-y-4">
          {/* Main container box with blue gradient background */}
          <div 
            className="p-0 rounded-2xl shadow-xl border-2"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
              borderColor: '#fbbf24'
            }}
          >
            {/* Orange Notification header */}
            <div className="text-center py-3 border-b-2" style={{ borderColor: '#fbbf24' }}>
              <h2 className="text-xl font-bold" style={{ color: '#fbbf24' }}>Notification</h2>
            </div>
            
            {/* Dark blue content area */}
            <div 
              className="p-6 mx-4 my-4 rounded-xl"
              style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)' }}
            >
              {/* Promotional image inside the content area */}
              <div className="mb-6">
                <img 
                  src={depositBonusImage} 
                  alt="V3 GAME Deposit Bonus - Welcome Offer" 
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Orange gradient button */}
            <div className="text-center pb-6 px-6">
              <button
                onClick={handleRegister}
                className="w-full px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
                  color: 'white'
                }}
              >
                REGISTER NOW
              </button>
            </div>
          </div>
          
          {/* Close button positioned below the main box */}
          <div className="flex justify-center">
            <button
              onClick={handleClose}
              className="w-10 h-10 transition-all duration-200 hover:scale-110 focus:outline-none border-none"
            >
              <img 
                src={closeIcon} 
                alt="Close" 
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}