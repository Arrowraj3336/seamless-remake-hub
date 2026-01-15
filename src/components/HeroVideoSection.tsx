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
      className="relative w-full h-screen overflow-hidden"
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
            filter: 'brightness(0.9) contrast(1.05) saturate(1.1)',
          }}
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
        
        {/* Smooth gradient overlays - seamless blend with website */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
        
        {/* Soft vignette for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.4) 70%, hsl(var(--background) / 0.8) 100%)'
          }}
        />
        
        {/* Bottom fade for seamless transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
