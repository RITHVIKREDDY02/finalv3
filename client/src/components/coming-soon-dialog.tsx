import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Wrench, Sparkles } from "lucide-react";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

export function ComingSoonDialog({ isOpen, onClose, gameName }: ComingSoonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-gradient-to-br from-[#FED358] via-[#FED358] to-[#F5C842] border-none rounded-2xl shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-black/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-black/5 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 -right-8 w-12 h-12 bg-black/5 rounded-full animate-pulse delay-300"></div>
        </div>

        <DialogHeader className="relative text-center space-y-6 pt-2">
          {/* Icon with gradient background and animation */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center shadow-lg animate-glow shimmer-effect transform transition-transform duration-300 hover:scale-105">
                <Clock className="w-10 h-10 text-[#FED358] animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              {/* Decorative sparkles */}
              <Sparkles className="absolute -top-2 -right-1 w-5 h-5 text-black/30 animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-black/20 animate-pulse delay-500" />
              <Sparkles className="absolute top-0 left-1/2 w-3 h-3 text-black/25 animate-pulse delay-1000" />
            </div>
          </div>
          
          <div className="space-y-2">
            <DialogTitle className="text-3xl font-bold text-black bg-gradient-to-r from-black to-gray-800 bg-clip-text">
              Coming Soon
            </DialogTitle>
            <div className="w-16 h-1 bg-black/20 rounded-full mx-auto"></div>
          </div>
          
          <div className="space-y-4 px-2">
            <div className="flex items-center justify-center gap-2 text-black text-xl font-semibold">
              <Wrench className="w-5 h-5 text-black/70" />
              <span>{gameName}</span>
            </div>
            <p className="text-black text-base font-medium leading-relaxed">
              is currently under maintenance
            </p>
            <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-black/10">
              <p className="text-black text-sm leading-relaxed font-medium">
                🔧 We're working hard to bring this exciting game back online with amazing new features!
              </p>
              <p className="text-black text-sm mt-2 font-medium">
                ⚡ Please check back soon for updates
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex justify-center pt-6 pb-2">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-black to-gray-800 text-[#FED358] hover:from-gray-800 hover:to-black font-bold px-10 py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl border border-black/20 shimmer-effect relative overflow-hidden"
          >
            <span className="text-lg relative z-10">Got it!</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}