import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBackgroundVideo from '@/assets/hero-video-new.mp4';

gsap.registerPlugin(ScrollTrigger);

const HeroVideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the video container with smooth entrance
      gsap.fromTo(
        sectionRef.current,
        { 
          opacity: 0,
          scale: 1.05,
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
        }
      );

      // Subtle scale effect on scroll - removed aggressive parallax
      gsap.to(videoRef.current, {
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
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
            filter: 'brightness(1.05) contrast(1.1) saturate(1.15)',
          }}
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
        
        {/* Minimal top gradient for header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent" />
        
        {/* Bottom fade for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
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
