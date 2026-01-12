import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title split animation with 3D effect
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, rotateX: 15, transformOrigin: 'center bottom' },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          modelsRef.current?.children || [],
          { opacity: 0, scale: 0.5, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.3'
        )
        .fromTo(
          imagesRef.current?.children || [],
          { opacity: 0, scale: 0.7, y: 50, rotateY: -20 },
          { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
          '-=0.4'
        );

      // Floating animation for images
      gsap.to('.hero-image-1', {
        y: -15,
        rotation: 2,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.hero-image-2', {
        y: -20,
        rotation: -2,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // Background glow animation
      gsap.to('.hero-glow', {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Model badges floating
      gsap.to('.model-badge', {
        y: -5,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const aiModels = ['Seedance AI', 'Runway AI', 'Veo 3.1', 'Kling AI', 'Neo Banana'];

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="hero-glow absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hero-glow absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl pointer-events-none animate-spin" style={{ animationDuration: '20s' }} />
      
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Main heading */}
        <h1
          ref={titleRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0"
        >
          Generate Stunning{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">AI Videos</span> with
          <br />
          Premium Models
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto opacity-0">
          Access the world's most powerful AI video generators in one platform. Create professional videos in seconds.
        </p>

        {/* AI Models badges */}
        <div ref={modelsRef} className="flex flex-wrap items-center justify-center gap-3 mb-8 opacity-0">
          {aiModels.map((model, index) => (
            <div
              key={index}
              className="model-badge flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm backdrop-blur-sm hover:border-primary/50 hover:bg-secondary/80 transition-all duration-300 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
              <span>{model}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            Start Generating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary hover:border-primary/50 px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5 fill-current" />
            Watch demo
          </Button>
        </div>

        {/* Trust text */}
        <p className="text-muted-foreground text-sm mb-12">
          Trusted by <span className="text-foreground font-medium">50,000+</span> creators worldwide
        </p>

        {/* Hero images */}
        <div ref={imagesRef} className="flex items-center justify-center gap-4 md:gap-6" style={{ perspective: '1000px' }}>
          <div className="relative group hero-image-1">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden gradient-border shadow-2xl shadow-primary/20">
              <img
                src={heroPerson1}
                alt="AI generated video content"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Veo 3.1
            </div>
          </div>
          
          <div className="relative group hero-image-2">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden gradient-border shadow-2xl shadow-violet-600/20">
              <img
                src={heroPerson2}
                alt="AI video creation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50 hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-primary-foreground fill-current" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              Runway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;