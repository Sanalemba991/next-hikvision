import React, { useState, useEffect } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = "", onClick }) => {
  const [displaySrc, setDisplaySrc] = useState<string>('/placeholder-product.png');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Process image source when component mounts or source changes
  useEffect(() => {
    if (!src) return;
    
    try {
      // If already starts with data:image, use as is
      if (src.startsWith('data:image')) {
        setDisplaySrc(src);
      } 
      // Otherwise, assume it's a raw base64 string and add the prefix
      else if (src) {
        setDisplaySrc(`data:image/jpeg;base64,${src}`);
      }
    } catch (error) {
      console.error('Error processing image source:', error);
      setDisplaySrc('/placeholder-product.png');
    }
  }, [src]);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        minHeight: '100px',
        overflow: 'visible',
        width: '100%',
        height: '100%'
      }}
      onClick={onClick}
      data-testid="product-image-container"
    >
      {/* Loading spinner */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: '#ffffff', zIndex: 5 }}
        >
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image - with direct style forcing */}
      <img
        src={displaySrc}
        alt={alt || "Product image"}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          maxHeight: '100%', 
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
          zIndex: 10,
          position: 'relative'
        }}
        onLoad={() => {
          console.log(`✅ Image loaded successfully: ${alt}`);
          setIsLoaded(true);
        }}
        onError={(e) => {
          console.error(`❌ Failed to load image: ${alt}`);
          setDisplaySrc('/placeholder-product.png');
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default ProductImage;