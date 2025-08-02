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

  const handleHelp = () => {
    window.open("https://t.me/tashanwinsamaraa", "_blank");
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
              🚀 Important Instructions
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
              Create a new account via the "Start" button for server connection. Our app checks the server to ensure accurate predictions.
            </p>
            <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-700">
              <p className="text-xs text-red-700 dark:text-red-300 font-semibold">
                Warning: Accounts not created through our link will be banned their IP
              </p>
            </div>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
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
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Enter Your UID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your unique UID"
                        {...field}
                        className="border-yellow-300 focus:border-yellow-500 dark:border-yellow-600 dark:focus:border-yellow-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "START"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Need help?</p>
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
              onClick={handleHelp}
            >
              Telegram: @tashanwinsamaraa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}