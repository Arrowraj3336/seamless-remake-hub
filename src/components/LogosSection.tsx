import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, Wand2, Zap, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: 'Seedance AI', icon: <Video className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Runway AI', icon: <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Veo 3.1', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Kling AI', icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { name: 'Neo Banana', icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" /> },
];

const LogosSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text reveal animation
      gsap.fromTo(
        '.logos-text',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Model badges staggered reveal with enhanced effects
      gsap.fromTo(
        '.model-item',
        { 
          opacity: 0, 
          scale: 0.6, 
          y: 30,
          rotateX: -15,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: 'center',
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle floating animation after reveal
      gsap.to('.model-item', {
        y: -3,
        duration: 2,
        ease: 'sine.inOut',
        stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true,
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 border-y border-primary/20 glass opacity-0">
      <div className="container mx-auto px-4">
        <p className="logos-text text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          Powered by the world's leading AI video models
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10" style={{ perspective: '800px' }}>
          {models.map((model, index) => (
            <div
              key={index}
              className="model-item flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass border border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-primary group-hover:scale-110 transition-transform">{model.icon}</span>
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{model.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
