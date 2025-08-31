import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Star, Shield, Zap, Users } from "lucide-react";
import logoPath from "@assets/TASHAN WIN LOGO_1754052537792.png";

const registerSchema = z.object({
  uid: z.string().min(1, "UID is required").trim(),
});

type RegisterForm = z.infer<typeof registerSchema>;

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: (uid: string) => void;
}

export default function RegistrationDialog({ isOpen, onClose, onRegistrationSuccess }: RegistrationDialogProps) {
  const { toast } = useToast();
  
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      uid: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      return await apiRequest(`/api/register`, "POST", data);
    },
    onSuccess: (response) => {
      const uid = form.getValues("uid");
      
      // Store UID in localStorage
      localStorage.setItem("v3game_user_uid", uid);
      
      toast({
        title: "Registration Successful!",
        description: "Your UID has been submitted for approval. Please wait for admin approval.",
      });
      
      onRegistrationSuccess(uid);
      onClose();
    },
    onError: (error: any) => {
      if (error.message.includes("409")) {
        const uid = form.getValues("uid");
        localStorage.setItem("v3game_user_uid", uid);
        toast({
          title: "Already Registered",
          description: "This UID is already registered. Checking approval status...",
        });
        onRegistrationSuccess(uid);
        onClose();
      } else {
        toast({
          title: "Registration Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };

  const handleStartButtonClick = () => {
    window.open("https://www.v3game6.com/#/pages/login/register?invitationCode=1919483925", "_blank");
  };

  const handleHelp = () => {
    window.open("https://t.me/Bea_A22", "_blank");
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
              VIP ACCESS
            </DialogTitle>
            <DialogDescription className="warm-gold font-medium text-center text-sm">
              Exclusive Predictions
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
                <h3 className="font-bold light-gold mb-1 text-sm">Getting Started</h3>
                <p className="text-xs warm-gold leading-relaxed">
                  Create account via our secure link for accurate predictions.
                </p>
              </div>
            </div>
            
            <div className="bg-red-900/30 p-2 rounded border border-red-500/30">
              <p className="text-xs text-red-300 font-medium flex items-center gap-2">
                <Shield className="w-3 h-3 flex-shrink-0" />
                <span>Important: Only verified accounts receive accurate predictions</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="light-gold font-semibold text-sm">
                      Enter Your UID
                    </FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input
                          placeholder="Your unique UID..."
                          {...field}
                          className="h-10 px-3 text-sm bg-banner-gradient border-2 border-accent-gold/50 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 light-gold placeholder:accent-gold rounded-lg"
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        className="w-full h-10 font-bold text-sm rounded-lg transition-all duration-200 custom-button"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>PROCESSING...</span>
                          </div>
                        ) : (
                          <span>JOIN VIP</span>
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Action Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                className="flex-1 h-9 font-semibold text-sm rounded-lg btn-body-bg"
                onClick={handleStartButtonClick}
              >
                Register link
              </Button>
              <Button
                className="flex-1 h-9 font-semibold text-sm rounded-lg btn-body-bg"
                onClick={handleHelp}
              >
                HELP
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs accent-gold">
                Join VIP members
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}