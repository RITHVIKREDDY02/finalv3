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
import { Loader2 } from "lucide-react";
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
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: '#FED358', color: 'black' }}>
        <DialogHeader className="text-center space-y-4">
          <div className="text-center">
            <DialogTitle className="text-xl font-bold text-black text-center">
              TASHAN WIN VIP PREDICTION
            </DialogTitle>
            <DialogDescription className="mt-2 text-black text-center font-semibold">
              🚀 Important Instructions
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-yellow-200 p-4 rounded-lg border border-yellow-300">
            <p className="text-sm text-black leading-relaxed font-semibold">
              Create a new account via the "Start" button for server connection. Our app checks the server to ensure accurate predictions.
            </p>
            <div className="mt-3 p-2 bg-red-200 rounded border border-red-300">
              <p className="text-xs text-red-800 font-semibold">
                Warning: Accounts not created through our link will be banned their IP
              </p>
            </div>
            <p className="text-xs text-black mt-2 font-semibold">
              For 100% accurate predictions, use the account created via our URL.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Enter Your UID
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="flex-1">
                        <Input
                          placeholder="Enter your unique UID"
                          {...field}
                          className="border-black focus:border-black bg-white text-black"
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        className="px-6 py-2 rounded-full font-bold btn-custom-gold"
                        style={{ backgroundColor: '#FED358', color: 'black' }}
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "SUBMIT"
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="text-center space-y-3">
            <div className="flex gap-2 justify-center">
              <Button
                className="btn-body-bg px-4 py-2 rounded-full font-semibold"
                onClick={handleStartButtonClick}
              >
                🚀 Start
              </Button>
              <Button
                className="btn-body-bg px-4 py-2 rounded-full font-semibold"
                disabled
              >
                🔒 Continue
              </Button>
              <Button
                className="btn-body-bg px-4 py-2 rounded-full font-semibold"
                onClick={handleHelp}
              >
                ❓ Help
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}