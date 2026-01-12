import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';
import gsap from 'gsap';
import heroPerson1 from '@/assets/hero-person-1.jpg';
import heroPerson2 from '@/assets/hero-person-2.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-50, 50)`,
            opacity: `random(0.3, 0.8)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(4, 8)`,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.2,
          });
        });
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title split animation with 3D effect
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotateX: 20, transformOrigin: 'center bottom', filter: 'blur(20px)' },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 1.4 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50, filter: 'blur(15px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
          '-=0.8'
        )
        .fromTo(
          modelsRef.current?.children || [],
          { opacity: 0, scale: 0.3, y: 30, rotateY: -30 },
          { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 40, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          imagesRef.current?.children || [],
          { opacity: 0, scale: 0.6, y: 80, rotateY: -25 },
          { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' },
          '-=0.5'
        );

      // Floating animation for images
      gsap.to('.hero-image-1', {
        y: -20,
        rotation: 3,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-image-2', {
        y: -25,
        rotation: -3,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Background glow animation
      gsap.to('.hero-glow', {
        scale: 1.3,
        opacity: 0.6,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Orb animations
      gsap.to('.hero-orb-1', {
        x: 50,
        y: -30,
        scale: 1.2,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-orb-2', {
        x: -40,
        y: 40,
        scale: 0.8,
        duration: 7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Model badges floating with glow
      gsap.to('.model-badge', {
        y: -8,
        boxShadow: '0 0 30px hsl(270 100% 60% / 0.4)',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.15,
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
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient orbs */}
      <div className="hero-orb-1 absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-primary/30 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-accent/25 via-cyber-pink/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Central glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-conic from-primary/20 via-accent/10 to-primary/20 rounded-full blur-3xl pointer-events-none animate-spin-slow" />
      
      {/* Floating particles */}
      <div ref={particlesRef} className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
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
              className="model-badge flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/30 text-xs sm:text-sm cursor-pointer group hover:border-primary/60 transition-all duration-300"
            >
              <span className="text-primary group-hover:text-accent transition-colors">{model.icon}</span>
              <span className="whitespace-nowrap">{model.name}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-0 px-4">
          <Button
            size="lg"
            className="w-full sm:w-auto btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium rounded-full shadow-glow hover:shadow-glow-intense border-0"
          >
            Start Generating
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-primary/40 hover:bg-primary/10 hover:border-primary/60 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base rounded-full transition-all duration-300 glass"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            Watch demo
          </Button>
        </div>

        {/* Trust text */}
        <p className="text-muted-foreground text-xs sm:text-sm mb-8 sm:mb-12">
          Trusted by <span className="text-foreground font-medium gradient-text">50,000+</span> creators worldwide
        </p>

        {/* Hero images */}
        <div ref={imagesRef} className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6" style={{ perspective: '1000px' }}>
          <div className="relative group hero-image-1">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden gradient-border glow-effect">
              <img
                src={heroPerson1}
                alt="AI generated video content"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-white px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg shadow-primary/30">
              Veo 3.1
            </div>
          </div>
          
          <div className="relative group hero-image-2">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl overflow-hidden gradient-border glow-effect-intense">
              <img
                src={heroPerson2}
                alt="AI video creation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
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
