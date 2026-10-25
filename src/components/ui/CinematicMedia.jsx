import { useEffect, useRef } from 'react';

function mediaType(path) {
  return path?.toLowerCase().includes('.mp4') ? 'video/mp4' : 'video/webm';
}

export default function CinematicMedia({
  src,
  videoSrc,
  mobileVideoSrc,
  alt = '',
  width,
  height,
  srcSet,
  sizes,
  className = '',
  mediaClassName = '',
  priority = false,
  children,
}) {
  const hasVideo = Boolean(videoSrc || mobileVideoSrc);
  const videoRef = useRef(null);
  const positioningClass = className.includes('absolute') ? '' : 'relative';

  useEffect(() => {
    const video = videoRef.current;
    if (!video || priority) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [hasVideo, priority]);

  return (
    <div className={`${positioningClass} overflow-hidden bg-night ${className}`}>
      {hasVideo ? (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${mediaClassName}`}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          poster={src}
          aria-label={alt || undefined}
        >
          {mobileVideoSrc && (
            <source src={mobileVideoSrc} media="(max-width: 767px)" type={mediaType(mobileVideoSrc)} />
          )}
          {videoSrc && <source src={videoSrc} type={mediaType(videoSrc)} />}
        </video>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          // React 18 only knows the lowercase attribute.
          fetchpriority={priority ? 'high' : 'auto'}
          width={width}
          height={height}
          srcSet={srcSet}
          sizes={sizes}
          decoding="async"
          className={`h-full w-full object-cover ${mediaClassName}`}
        />
      )}
      {children}
    </div>
  );
}
