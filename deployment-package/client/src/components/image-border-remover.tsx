import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Scissors } from 'lucide-react';

interface ImageBorderRemoverProps {
  className?: string;
}

export function ImageBorderRemover({ className }: ImageBorderRemoverProps) {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Create image element
      const img = new Image();
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Load the image
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
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

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    } else {
      alert('Please select a valid image file.');
    }
  }, [processImage]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const downloadCroppedImage = useCallback(() => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [croppedImage]);

  const resetImages = useCallback(() => {
    setOriginalImage(null);
    setCroppedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Image Border Remover
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleUploadClick}
            disabled={isProcessing}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
          
          {(originalImage || croppedImage) && (
            <Button 
              onClick={resetImages}
              variant="outline"
            >
              Reset
            </Button>
          )}
        </div>

        {isProcessing && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Processing image...</p>
          </div>
        )}

        {originalImage && !isProcessing && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Original Image:</h3>
              <img 
                src={originalImage} 
                alt="Original" 
                className="max-w-full h-auto border rounded-lg shadow-sm"
                style={{ maxHeight: '300px' }}
              />
            </div>

            {croppedImage && (
              <div>
                <h3 className="text-sm font-medium mb-2">Cropped Image (borders removed):</h3>
                <img 
                  src={croppedImage} 
                  alt="Cropped" 
                  className="max-w-full h-auto border rounded-lg shadow-sm"
                  style={{ maxHeight: '300px' }}
                />
                <Button 
                  onClick={downloadCroppedImage}
                  className="mt-2 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Cropped Image
                </Button>
              </div>
            )}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
}