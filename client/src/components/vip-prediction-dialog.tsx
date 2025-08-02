import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import logoPath from "@assets/TASHAN WIN LOGO_1754052537792.png";

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
  
  const { data: userStatus, isLoading, refetch } = useQuery<UserStatus>({
    queryKey: [`/api/user/${uid}`],
    enabled: !!uid && isOpen,
    refetchInterval: isOpen ? 5000 : false, // Check every 5 seconds only when dialog is open
  });

  useEffect(() => {
    if (userStatus?.approved) {
      toast({
        title: "Approved!",
        description: "Your account has been approved. You can now continue to predictions.",
      });
    }
  }, [userStatus?.approved, toast]);

  const handleContinue = () => {
    if (userStatus?.approved) {
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
    window.open("https://t.me/tashanwinsamaraa", "_blank");
  };

  const handleBackToRegister = () => {
    onClose();
    onBackToRegister();
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-blue-500" />;
    if (userStatus?.approved) return <CheckCircle className="h-6 w-6 text-green-500" />;
    return <Clock className="h-6 w-6 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (isLoading) return "Checking status...";
    if (userStatus?.approved) return "Approved - Ready to continue";
    return "Pending approval";
  };

  const getStatusDescription = () => {
    if (isLoading) return "Please wait while we verify your registration...";
    if (userStatus?.approved) return "Your account has been approved! You can now access VIP predictions.";
    return "Your registration is being reviewed by our admin team. This usually takes a few minutes.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={logoPath} 
              alt="TASHANWIN Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <div>
            <DialogTitle className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
              TASHAN WIN VIP PREDICTION
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-600 dark:text-gray-400">
              Registration Status for UID: {uid}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              {getStatusIcon()}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {getStatusText()}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {getStatusDescription()}
            </p>
          </div>

          {!userStatus?.approved && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                    What happens next?
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Our admin team will review your registration and approve your account. 
                    Once approved, the "Continue" button will be enabled automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              disabled={!userStatus?.approved}
              className={`w-full font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                userStatus?.approved 
                  ? "btn-custom-gold" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {userStatus?.approved ? "CONTINUE" : "CONTINUE (Locked)"}
            </Button>

            <Button
              variant="outline"
              onClick={handleHelp}
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              HELP - Telegram: @tashanwinsamaraa
            </Button>

            <Button
              variant="ghost"
              onClick={handleBackToRegister}
              className="w-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Back to Registration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}