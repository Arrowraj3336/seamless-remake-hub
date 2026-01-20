import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Zap, Star, Cpu } from 'lucide-react';
import gsap from 'gsap';
import PromptShowcase from './PromptShowcase';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles with smoother motion
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-60, 60)`,
            opacity: `random(0.15, 0.5)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(8, 15)`,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.1,
          });
        });
      }

      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'power4.out',
        } 
      });

      // Badge animation first
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      )
      // Smoother title animation
      .fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.95,
          filter: 'blur(20px)' 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)', 
          duration: 1.4,
          ease: 'power3.out'
        },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        modelsRef.current?.children || [],
        { opacity: 0, scale: 0.5, y: 25 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.08, 
          ease: 'elastic.out(1, 0.75)' 
        },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: 'back.out(1.4)' 
        },
        '-=0.4'
      );

      // Background glow animation - smoother
      gsap.to('.hero-glow', {
        scale: 1.3,
        opacity: 0.4,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Orb animations - smoother with rotation
      gsap.to('.hero-orb-1', {
        x: 60,
        y: -40,
        scale: 1.2,
        rotation: 10,
        duration: 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-orb-2', {
        x: -50,
        y: 50,
        scale: 0.8,
        rotation: -8,
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Model badges floating - smoother with subtle rotation
      gsap.to('.model-badge', {
        y: -8,
        rotation: 'random(-2, 2)',
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.15,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const aiModels = [
    { name: 'Seedance AI', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'from-violet-500 to-purple-600' },
    { name: 'Runway AI', icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'from-pink-500 to-rose-600' },
    { name: 'Veo 3.1', icon: <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'from-blue-500 to-cyan-500' },
    { name: 'Kling AI', icon: <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'from-amber-500 to-orange-500' },
    { name: 'Neo Banana', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-4 px-4 relative overflow-hidden min-h-[80vh] sm:min-h-0"
      style={{ perspective: '1200px' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
      
      {/* Gradient orbs */}
      <div className="hero-orb-1 absolute top-1/4 left-1/4 w-48 sm:w-80 md:w-[500px] h-48 sm:h-80 md:h-[500px] bg-gradient-radial from-primary/30 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-48 sm:w-80 md:w-[400px] h-48 sm:h-80 md:h-[400px] bg-gradient-radial from-accent/25 via-cyber-pink/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Central glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px] bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 opacity-0"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            🎬 Introducing <span className="text-primary font-semibold">Veo 3.1</span> — Now Available
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 sm:mb-6 opacity-0"
        >
          Transform Your Ideas Into{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text text-glow">Stunning AI Videos</span>
          <br />
          <span className="text-foreground/90">In Seconds</span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto opacity-0 px-4 leading-relaxed">
          Harness the power of 5 world-class AI models. Create cinematic videos, stunning visuals, and captivating content with just a text prompt.
        </p>

        {/* Interactive Prompt Showcase */}
        <PromptShowcase />

        {/* AI Models badges */}
        <div ref={modelsRef} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 mb-5 sm:mb-6 opacity-0 px-2">
          {aiModels.map((model, index) => (
            <div
              key={index}
              className="model-badge flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass border border-primary/20 text-xs sm:text-sm cursor-pointer group hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 hover:shadow-glow"
            >
              <span className={`bg-gradient-to-r ${model.color} bg-clip-text text-transparent`}>{model.icon}</span>
              <span className="whitespace-nowrap font-medium">{model.name}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 opacity-0 px-4">
          <Button
            size="lg"
            className="w-full sm:w-auto btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-base font-semibold rounded-full shadow-glow hover:shadow-glow-intense border-0 transition-all duration-500 group"
          >
            Start Creating Free
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary/50 px-8 sm:px-10 py-6 sm:py-7 text-sm sm:text-base rounded-full transition-all duration-500 glass group"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-background" />
              ))}
            </div>
            <span>15M+ videos created</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>4.9/5 rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
