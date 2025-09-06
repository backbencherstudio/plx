"use client";

import Image from "next/image";
import { useState } from "react";
import { StaticImageData } from "next/image";

interface AvatarProps {
  src?: string | StaticImageData;
  alt: string;
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ 
  src, 
  alt, 
  name, 
  size = 40, 
  className = "" 
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get first letter of name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate background color based on name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const shouldShowFallback = !src || imageError || !imageLoaded;
  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  return (
    <div 
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {shouldShowFallback ? (
        <div 
          className={`w-full h-full ${bgColor} flex items-center justify-center text-white font-semibold`}
          style={{ fontSize: size * 0.4 }}
        >
          {initials}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
}