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
      localStorage.setItem("tashan_user_uid", uid);
      
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
        localStorage.setItem("tashan_user_uid", uid);
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
    window.open("https://tashanwin6.com/#/register?invitationCode=56822100324", "_blank");
  };

  const handleHelp = () => {
    window.open("https://t.me/tashanwinsamaraa", "_blank");
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
        <div className="relative p-6 rounded-t-2xl bg-banner-gradient border-b border-accent-gold/30">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: '#FED358',
                boxShadow: '0 0 20px rgba(254, 211, 88, 0.4)'
              }}>
              <Star className="w-10 h-10 text-black" />
            </div>
            <DialogTitle className="text-2xl font-bold light-gold drop-shadow-lg">
              TASHAN WIN VIP ACCESS
            </DialogTitle>
            <DialogDescription className="warm-gold font-semibold text-center">
              🚀 Exclusive Prediction Portal
            </DialogDescription>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Premium Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-banner-gradient p-4 rounded-xl border border-accent-gold/30 text-center game-card">
              <Shield className="w-8 h-8 warm-gold mx-auto mb-2" />
              <p className="text-sm font-bold light-gold">Verified</p>
              <p className="text-xs accent-gold">Security</p>
            </div>
            <div className="bg-banner-gradient p-4 rounded-xl border border-accent-gold/30 text-center game-card">
              <Zap className="w-8 h-8 warm-gold mx-auto mb-2" />
              <p className="text-sm font-bold light-gold">Lightning</p>
              <p className="text-xs accent-gold">Predictions</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-banner-gradient p-5 rounded-xl border border-accent-gold/50 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#FED358' }}>
                <Users className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-bold light-gold mb-2 text-lg">Getting Started</h3>
                <p className="text-sm warm-gold leading-relaxed">
                  Create your account via our secure registration link for server connection and accurate predictions.
                </p>
              </div>
            </div>
            
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
              <p className="text-sm text-red-300 font-semibold flex items-center gap-3">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span>Important: Only verified accounts through our link receive 100% accurate predictions</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="light-gold font-bold text-base">
                      Enter Your UID
                    </FormLabel>
                    <div className="space-y-4">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Your unique UID..."
                            {...field}
                            className="h-14 px-5 text-lg font-semibold bg-banner-gradient border-2 border-accent-gold/50 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 light-gold placeholder:accent-gold rounded-xl shadow-inner"
                          />
                        </div>
                      </FormControl>
                      <Button
                        type="submit"
                        className="w-full h-14 font-bold text-lg rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none custom-button"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <div className="flex items-center gap-3">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>PROCESSING...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Star className="h-6 w-6" />
                            <span>JOIN VIP NOW</span>
                          </div>
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
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                className="flex-1 h-12 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] btn-body-bg"
                onClick={handleStartButtonClick}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>🚀 START</span>
                </div>
              </Button>
              <Button
                className="flex-1 h-12 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] btn-body-bg"
                onClick={handleHelp}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>❓ HELP</span>
                </div>
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-sm accent-gold">
                🎯 Join thousands of successful VIP members
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}