import { useState, useEffect } from 'react';

interface Base64ImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const Base64Image = ({ src, alt, className = "", onClick }: Base64ImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('/placeholder-product.png');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Don't process empty sources
    if (!src) {
      setImageUrl('/placeholder-product.png');
      setError(true);
      return;
    }

    try {
      // If already a valid URL or data URL, use directly
      if (src.startsWith('data:image') || src.startsWith('http')) {
        setImageUrl(src);
      } 
      // If it's a raw base64 string, add proper prefix
      else {
        // Check if it's truly base64 content (basic validation)
        const isBase64 = /^[A-Za-z0-9+/=]+$/.test(src.trim());
        
        if (isBase64) {
          const dataUrl = `data:image/jpeg;base64,${src.trim()}`;
          setImageUrl(dataUrl);
        } else {
          console.error('Invalid base64 string:', src.substring(0, 50) + '...');
          setImageUrl('/placeholder-product.png');
          setError(true);
        }
      }
    } catch (err) {
      console.error('Error processing image source:', err);
      setImageUrl('/placeholder-product.png');
      setError(true);
    }
  }, [src]);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img 
        src={imageUrl}
        alt={alt || "Product image"}
        className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => {
          console.log('✅ Image loaded successfully:', alt);
          setLoaded(true);
        }}
        onError={() => {
          console.error('❌ Failed to load image:', alt);
          setImageUrl('/placeholder-product.png');
          setError(true);
          setLoaded(true);
        }}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};

export default Base64Image;