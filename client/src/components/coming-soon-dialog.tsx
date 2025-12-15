import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Wrench, Zap } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

export function ComingSoonDialog({ isOpen, onClose, gameName }: ComingSoonDialogProps) {
  const isWingoGame = gameName === 'Win Go' || gameName === 'Trx Wingo';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto border-none rounded-2xl shadow-2xl overflow-hidden p-0" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
        border: '1px solid rgba(254, 211, 88, 0.3)'
      }}>
        <div className="p-6">
          <DialogHeader className="relative text-center space-y-6 pt-2">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{
                  background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)',
                  boxShadow: '0 10px 40px rgba(254, 211, 88, 0.4)'
                }}>
                  {isWingoGame ? (
                    <Zap className="w-10 h-10 text-black" />
                  ) : (
                    <Clock className="w-10 h-10 text-black" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-center">
              <DialogTitle className="text-2xl font-bold" style={{ color: '#FED358' }}>
                {isWingoGame ? `${gameName} Prediction` : 'Coming Soon'}
              </DialogTitle>
              <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'rgba(254, 211, 88, 0.3)' }}></div>
            </div>
            
            <div className="space-y-4 px-2">
              {isWingoGame ? (
                <>
                  <p className="text-lg font-semibold" style={{ color: '#FDE4BC' }}>
                    Join our prediction channel
                  </p>
                  <div className="rounded-xl p-4" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>
                      🔧 We're preparing exclusive predictions for this game with our advanced AI system!
                    </p>
                    <p className="text-sm mt-2 font-medium" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>
                      ⚡ Deposit now and start using our hack.
                    </p>
                  </div>
                  <a 
                    href="https://t.me/Earn_With_Milind_77" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-xl shadow-lg mt-4"
                    style={{
                      background: 'linear-gradient(135deg, #0088cc 0%, #0066aa 100%)',
                      color: '#fff'
                    }}
                  >
                    <FaTelegram className="text-xl" />
                    <span>Join Telegram Channel</span>
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold" style={{ color: '#FDE4BC' }}>
                    <Wrench className="w-5 h-5" style={{ color: '#FED358' }} />
                    <span>{gameName}</span>
                  </div>
                  <p className="text-base font-medium leading-relaxed" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
                    is currently under maintenance
                  </p>
                  <div className="rounded-xl p-4" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>
                      🔧 We're working hard to bring this exciting game back online with amazing new features!
                    </p>
                    <p className="text-sm mt-2 font-medium" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>
                      ⚡ Please check back soon for updates
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogHeader>
          
          <div className="flex justify-center pt-6 pb-2">
            <Button
              onClick={onClose}
              className="font-bold px-10 py-3 rounded-xl shadow-lg border-0"
              style={{
                background: 'linear-gradient(135deg, #FED358 0%, #FF6B35 100%)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(254, 211, 88, 0.4)'
              }}
            >
              <span className="text-lg">Got it!</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
