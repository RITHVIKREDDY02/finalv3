import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Gift, ArrowRight, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open("https://www.v3gameb.com/#/pages/login/register?invitationCode=7532630349", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ 
              background: 'linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)',
              boxShadow: '0 8px 32px rgba(255, 184, 0, 0.3)'
            }}>
            <Gift className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Register Now
          </h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-4 rounded-xl border-l-4 border-yellow-500"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)'
            }}>
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300">Sign Up Reward</p>
                <p className="text-lg font-bold text-yellow-500">Get Upto Rs.500</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                  data-testid="input-name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300 text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500/20"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border-0 text-black"
              style={{ 
                background: 'linear-gradient(135deg, #FFB800 0%, #FF6B35 100%)',
                boxShadow: '0 4px 20px rgba(255, 184, 0, 0.4)'
              }}
              data-testid="button-register"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/" className="text-yellow-500 hover:text-yellow-400 font-medium" data-testid="link-login">
                Sign In
              </Link>
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
