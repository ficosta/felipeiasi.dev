import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoThumbnailProps {
  video?: string;
  thumbnail: string;
  alt: string;
  className?: string;
}

export function VideoThumbnail({ video, thumbnail, alt, className = '' }: VideoThumbnailProps) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && video && !hasError) {
      videoRef.current.play().catch(() => {
        setHasError(true);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  // If no video or video has error, show image only
  if (!video || hasError) {
    return (
      <motion.img
        src={thumbnail}
        alt={alt}
        className={className}
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/800x500/8B5CF6/FFFFFF?text=${encodeURIComponent(alt)}`;
        }}
      />
    );
  }

  // Show video with image poster
  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className={className}
        poster={thumbnail}
        muted
        loop
        playsInline
        preload="metadata"
        onError={handleVideoError}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Fallback image if video fails */}
      {hasError && (
        <img
          src={thumbnail}
          alt={alt}
          className={`${className} absolute inset-0`}
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/800x500/8B5CF6/FFFFFF?text=${encodeURIComponent(alt)}`;
          }}
        />
      )}
    </div>
  );
}
