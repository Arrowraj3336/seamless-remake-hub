import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroBackgroundVideo from '@/assets/hero-background-video.mp4';

const HeroVideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the video container with a 3D perspective effect
      gsap.fromTo(
        sectionRef.current,
        { 
          opacity: 0,
          scale: 1.1,
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden mt-6 md:mt-8"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Video Container with 3D effect */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: 'translateZ(-50px) scale(1.05)',
          transformStyle: 'preserve-3d'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.95) contrast(1.15) saturate(1.25)',
            imageRendering: 'crisp-edges',
          }}
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
        
        {/* Seamless gradient overlays matching website background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        
        {/* Enhanced color overlay for brand consistency */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary) / 0.05) 0%, transparent 40%, hsl(var(--primary) / 0.08) 100%)'
          }}
        />
        
        {/* Soft vignette for depth and focus */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.3) 70%, hsl(var(--background) / 0.7) 100%)'
          }}
        />
        
        {/* Extended bottom fade for ultra-smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background/50" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/60 text-sm font-medium tracking-wider uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroVideoSection;
