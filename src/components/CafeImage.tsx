import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

interface CafeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  categoryHint?: string;
}

export const CafeImage: React.FC<CafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  categoryHint,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-[#F0EAE1] ${containerClassName}`}>
      {/* Background warm shimmer while loading */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#EBE3D8] via-[#F4EDE5] to-[#E5DDD2] animate-pulse" />
      )}

      {/* Styled Fallback Container if image fails or gets blocked */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#EAE2D7] via-[#F4EFEA] to-[#E3D9CC] text-[#786B60] text-center select-none">
          <div className="w-10 h-10 rounded-full bg-white/70 shadow-sm flex items-center justify-center mb-2">
            <Coffee className="w-5 h-5 text-[#9A6B43]" />
          </div>
          <span className="text-xs font-serif font-medium tracking-wide text-[#594B40] line-clamp-1 max-w-[90%]">
            {alt}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#988879] mt-0.5">
            {categoryHint || "Bob The Baker's Cafe"}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      )}
    </div>
  );
};
