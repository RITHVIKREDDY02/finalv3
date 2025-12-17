import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)' }}>
      <Card className="w-full max-w-lg mx-4 bg-gray-900 border-gray-800">
        <CardContent className="pt-8 pb-8 px-6">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-16 w-16 text-yellow-400 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">404 - Page Not Found</h1>
            <p className="text-gray-300 mb-6 max-w-md">
              Sorry, the page you are looking for does not exist or has been moved. 
              Don't worry, you can explore V3 Game from our homepage.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Looking for gaming guides, registration help, or bonus information? 
              Visit our blog for the latest tips and tutorials on how to register, login, and win rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/">
                <button 
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-black shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, #FED358 0%, #FFB800 100%)' }}
                  data-testid="button-go-home"
                >
                  <Home className="h-5 w-5" />
                  Go to Homepage
                </button>
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white border border-gray-600 shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800 w-full sm:w-auto"
                data-testid="button-go-back"
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
