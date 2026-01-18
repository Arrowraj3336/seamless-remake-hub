import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
import gsap from 'gsap';
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles with smoother motion
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-80, 80)`,
            x: `random(-40, 40)`,
            opacity: `random(0.2, 0.6)`,
            scale: `random(0.6, 1.4)`,
            duration: `random(6, 12)`,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.15,
          });
        });
      }

      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'power4.out',
        } 
      });

      // Smoother title animation
      tl.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.95,
          filter: 'blur(15px)' 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)', 
          duration: 1.6,
          ease: 'power3.out'
        }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          '-=1'
        )
        .fromTo(
          modelsRef.current?.children || [],
          { opacity: 0, scale: 0.5, y: 25 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.06, 
            ease: 'elastic.out(1, 0.8)' 
          },
          '-=0.8'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.9, 
            stagger: 0.1, 
            ease: 'back.out(1.2)' 
          },
          '-=0.5'
        )
        .fromTo(
          videosRef.current?.children || [],
          { opacity: 0, scale: 0.7, y: 60 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1.4, 
            stagger: 0.15, 
            ease: 'power3.out' 
          },
          '-=0.6'
        );

      // Smoother floating animation for videos
      gsap.to('.hero-video-1', {
        y: -15,
        rotation: 2,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-video-2', {
        y: -20,
        rotation: -2,
        duration: 5.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.3,
      });

      // Background glow animation - smoother
      gsap.to('.hero-glow', {
        scale: 1.2,
        opacity: 0.5,
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Orb animations - smoother
      gsap.to('.hero-orb-1', {
        x: 40,
        y: -25,
        scale: 1.15,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-orb-2', {
        x: -30,
        y: 35,
        scale: 0.85,
        duration: 9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Model badges floating - smoother
      gsap.to('.model-badge', {
        y: -6,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.12,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const aiModels = [
    { name: 'Seedance AI', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { name: 'Runway AI', icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { name: 'Veo 3.1', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { name: 'Kling AI', icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
    { name: 'Neo Banana', icon: <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
  ];

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-4 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Gradient orbs */}
      <div className="hero-orb-1 absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-primary/25 via-primary/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-accent/20 via-cyber-pink/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Central glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-conic from-primary/15 via-accent/8 to-primary/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 3}px`,
              height: `${3 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Main heading */}
        <h1
          ref={titleRef}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 opacity-0"
        >
          Generate Stunning{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text text-glow">AI Videos</span> with
          <br />
          <span className="text-foreground">Premium Models</span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto opacity-0 px-4">
          Access the world's most powerful AI video generators in one platform. Create professional videos in seconds.
        </p>

        {/* AI Models badges */}
        <div ref={modelsRef} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 opacity-0 px-2">
          {aiModels.map((model, index) => (
            <div
              key={index}
              className="model-badge flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/25 text-xs sm:text-sm cursor-pointer group hover:border-primary/50 transition-all duration-500"
            >
              <span className="text-primary group-hover:text-accent transition-colors duration-300">{model.icon}</span>
              <span className="whitespace-nowrap">{model.name}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-0 px-4">
          <Button
            size="lg"
            className="w-full sm:w-auto btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium rounded-full shadow-glow hover:shadow-glow-intense border-0 transition-all duration-500"
          >
            Start Generating
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-primary/30 hover:bg-primary/8 hover:border-primary/50 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full transition-all duration-500 glass"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            Watch demo
          </Button>
        </div>

        {/* Trust text */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-8 sm:mb-12">
          Trusted by <span className="text-foreground font-medium gradient-text">50,000+</span> creators worldwide
        </p>

        {/* Hero videos */}
        <div ref={videosRef} className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6" style={{ perspective: '1000px' }}>
          <div className="relative group hero-video-1">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden gradient-border glow-effect">
              <video
                src={heroVideo1}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-white px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg shadow-primary/30">
              Veo 3.1
            </div>
          </div>
          
          <div className="relative group hero-video-2">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl overflow-hidden gradient-border glow-effect-intense">
              <video
                src={heroVideo2}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow hover:scale-110 transition-transform duration-300">
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-current" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-accent to-cyber-magenta text-white px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg shadow-accent/30">
              Runway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
