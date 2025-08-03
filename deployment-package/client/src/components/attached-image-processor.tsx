import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Scissors, Loader2 } from 'lucide-react';
import attachedImage from '@assets/image_1754156715464.png';

export function AttachedImageProcessor() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detectWhiteBorders = useCallback((imageData: ImageData) => {
    const { data, width, height } = imageData;
    const threshold = 240; // Consider pixels with RGB values above this as "white"
    
    // Find top border
    let top = 0;
    for (let y = 0; y < height; y++) {
      let hasNonWhite = false;
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        if (r < threshold || g < threshold || b < threshold) {
          hasNonWhite = true;
          break;
        }
      }
      if (hasNonWhite) {
        top = y;
        break;
      }
    }

    // Find bottom border
    let bottom = height - 1;
    for (let y = height - 1; y >= 0; y--) {
      let hasNonWhite = false;
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        if (r < threshold || g < threshold || b < threshold) {
          hasNonWhite = true;
          break;
        }
      }
      if (hasNonWhite) {
        bottom = y;
        break;
      }
    }

    // Find left border
    let left = 0;
    for (let x = 0; x < width; x++) {
      let hasNonWhite = false;
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        if (r < threshold || g < threshold || b < threshold) {
          hasNonWhite = true;
          break;
        }
      }
      if (hasNonWhite) {
        left = x;
        break;
      }
    }

    // Find right border
    let right = width - 1;
    for (let x = width - 1; x >= 0; x--) {
      let hasNonWhite = false;
      for (let y = 0; y < height; y++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        if (r < threshold || g < threshold || b < threshold) {
          hasNonWhite = true;
          break;
        }
      }
      if (hasNonWhite) {
        right = x;
        break;
      }
    }

    return { top, bottom, left, right };
  }, []);

  const processAttachedImage = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      const img = new Image();
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Load the attached image
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = attachedImage;
      });

      // Set canvas size to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      // Detect borders
      const borders = detectWhiteBorders(imageData);

      // Calculate cropped dimensions
      const croppedWidth = borders.right - borders.left + 1;
      const croppedHeight = borders.bottom - borders.top + 1;

      if (croppedWidth <= 0 || croppedHeight <= 0) {
        alert('No content found to crop!');
        return;
      }

      // Create new canvas for cropped image
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = croppedWidth;
      croppedCanvas.height = croppedHeight;
      const croppedCtx = croppedCanvas.getContext('2d');
      
      if (!croppedCtx) return;

      // Draw cropped portion
      croppedCtx.drawImage(
        img,
        borders.left, borders.top, croppedWidth, croppedHeight,
        0, 0, croppedWidth, croppedHeight
      );

      // Convert to blob and create URL
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          setCroppedImage(croppedUrl);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [detectWhiteBorders]);

  const downloadCroppedImage = useCallback(() => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'demo-cropped.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [croppedImage]);

  // Auto-process on component mount
  useEffect(() => {
    processAttachedImage();
  }, [processAttachedImage]);

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Your Demo Image - Border Removal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isProcessing && (
          <div className="text-center py-4">
            <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Removing white borders...</p>
          </div>
        )}

        {!isProcessing && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Original Image:</h3>
              <img 
                src={attachedImage} 
                alt="Original Demo" 
                className="max-w-full h-auto border rounded-lg shadow-sm"
                style={{ maxHeight: '300px' }}
              />
            </div>

            {croppedImage && (
              <div>
                <h3 className="text-sm font-medium mb-2">Cropped Image (borders removed):</h3>
                <img 
                  src={croppedImage} 
                  alt="Cropped Demo" 
                  className="max-w-full h-auto border rounded-lg shadow-sm"
                  style={{ maxHeight: '300px' }}
                />
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={downloadCroppedImage}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Cropped Image
                  </Button>
                  <Button 
                    onClick={processAttachedImage}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Scissors className="h-4 w-4" />
                    Re-process
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
}