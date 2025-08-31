import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import logoPath from "@assets/TASHAN WIN LOGO_1754052537792.png";
import { useUserVerification } from "@/hooks/use-fast-user-status";

interface UserStatus {
  registered: boolean;
  approved: boolean;
  user?: {
    id: string;
    uid: string;
    approved: boolean;
  };
}

interface VipPredictionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  onBackToRegister: () => void;
}

export default function VipPredictionDialog({ isOpen, onClose, uid, onBackToRegister }: VipPredictionDialogProps) {
  const { toast } = useToast();
  
  // Use the new fast user verification hook
  const { 
    isApproved, 
    isRegistered, 
    isLoading, 
    refreshStatus, 
    canAccessVipFeatures,
    needsApproval 
  } = useUserVerification(uid);

  // Immediately fetch status when dialog opens
  useEffect(() => {
    if (isOpen && uid) {
      refreshStatus();
    }
  }, [isOpen, uid, refreshStatus]);

  useEffect(() => {
    if (isApproved) {
      toast({
        title: "Approved!",
        description: "Your account has been approved. You can now continue to predictions.",
      });
    }
  }, [isApproved, toast]);

  const handleContinue = () => {
    if (isApproved) {
      toast({
        title: "Coming Soon!",
        description: "VIP Prediction features will be available soon.",
      });
    } else {
      toast({
        title: "Awaiting Approval",
        description: "Please wait for admin approval before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleHelp = () => {
    window.open("https://t.me/TashanGamesss", "_blank");
  };

  const handleBackToRegister = () => {
    onClose();
    onBackToRegister();
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
    if (isApproved) return <CheckCircle className="h-6 w-6 text-green-500" />;
    return <Clock className="h-6 w-6 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (isLoading) return "Checking status...";
    if (isApproved) return "Approved - Ready to continue";
    return "Pending approval";
  };

  const getStatusDescription = () => {
    if (isLoading) return "Please wait while we verify your registration...";
    if (isApproved) return "Your account has been approved! You can now access VIP predictions.";
    return "Your registration is being reviewed by our admin team. This usually takes a few minutes.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto my-4 w-[calc(100%-2rem)] rounded-xl bg-[#231C21] border-[#FED358]/20">
        <DialogHeader className="text-center space-y-4">
          <div>
            <DialogTitle className="text-xl font-bold text-[#FED358]">
              TASHAN WIN VIP PREDICTION
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-300">
              Registration Status for UID: {uid}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-lg border border-[#FED358]/20 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              {getStatusIcon()}
              <h3 className="text-lg font-semibold text-white">
                {getStatusText()}
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {getStatusDescription()}
            </p>
          </div>

          {!isApproved && (
            <div className="bg-gradient-to-r from-[#FED358]/10 to-[#FED358]/5 p-4 rounded-lg border border-[#FED358]/30">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-[#FED358] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#FED358] font-medium">
                    What happens next?
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Our admin team will review your registration and approve your account. 
                    Continue button will unlock until UID gets approved.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex gap-2 justify-center">
              <Button
                className="btn-body-bg px-4 py-2 rounded-full font-semibold"
                onClick={() => window.open("https://tashanwin6.com/#/register?invitationCode=487522520975", "_blank")}
              >
                Start
              </Button>
              <Button
                className={`px-4 py-2 rounded-full font-semibold ${
                  isApproved 
                    ? "btn-custom-gold" 
                    : "btn-body-bg opacity-50 cursor-not-allowed"
                }`}
                onClick={handleContinue}
                disabled={!isApproved}
              >
                Continue
              </Button>
              <Button
                className="btn-body-bg px-4 py-2 rounded-full font-semibold"
                onClick={handleHelp}
              >
                Help
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={handleBackToRegister}
              className="w-full text-gray-300 hover:bg-[#FED358]/10 hover:text-[#FED358]"
            >
              Back to Registration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}