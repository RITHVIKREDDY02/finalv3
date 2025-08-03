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
      <DialogContent className="sm:max-w-lg mx-auto my-4 w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto border-0 p-0 bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 rounded-2xl shadow-2xl">
        {/* Header with Logo and Close */}
        <div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 p-6 rounded-t-2xl">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Star className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white drop-shadow-md">
              VIP PREDICTION ACCESS
            </DialogTitle>
            <DialogDescription className="text-white/90 font-medium">
              Join our exclusive prediction community
            </DialogDescription>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl text-center">
              <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">Secure</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl text-center">
              <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-800">Fast</p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-white/50 shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Getting Started</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Create a new account using our secure link to connect with our prediction servers.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-3 rounded-lg border border-red-200 mt-3">
              <p className="text-xs text-red-800 font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Important: Only accounts created through our link are verified for accurate predictions
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-semibold text-sm">
                      Your Unique ID
                    </FormLabel>
                    <div className="space-y-3">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your UID here..."
                            {...field}
                            className="h-12 px-4 bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-gray-800 placeholder:text-gray-500 rounded-xl shadow-inner"
                          />
                        </div>
                      </FormControl>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5" />
                            <span>JOIN VIP</span>
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
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                className="flex-1 h-11 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
                onClick={handleStartButtonClick}
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>Start Now</span>
                </div>
              </Button>
              <Button
                className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
                onClick={handleHelp}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Get Help</span>
                </div>
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-600">
                Need assistance? Our support team is ready to help you get started.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}