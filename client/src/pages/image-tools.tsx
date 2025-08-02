import { ImageBorderRemover } from '@/components/image-border-remover';
import { AttachedImageProcessor } from '@/components/attached-image-processor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function ImageTools() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Image Tools</h1>
          <p className="text-white/90">Remove white borders from your images automatically</p>
        </div>
        
        <div className="space-y-6">
          <AttachedImageProcessor />
          <ImageBorderRemover className="bg-white/95 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}