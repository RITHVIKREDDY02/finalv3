import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
}

export function ComingSoonDialog({ isOpen, onClose, gameName }: ComingSoonDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-[#FED358] border-none rounded-xl">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#FED358]" />
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-black">
            Coming Soon
          </DialogTitle>
          
          <div className="space-y-3">
            <p className="text-black text-lg font-medium">
              {gameName} is currently under maintenance
            </p>
            <p className="text-black/80 text-sm">
              We're working hard to bring this exciting game back online. 
              Please check back later!
            </p>
          </div>
        </DialogHeader>
        
        <div className="flex justify-center pt-4">
          <Button
            onClick={onClose}
            className="bg-black text-[#FED358] hover:bg-black/90 font-semibold px-8 py-2 rounded-lg"
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}