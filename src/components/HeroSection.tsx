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

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          modelsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          imagesRef.current?.children || [],
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const aiModels = ['Seedance AI', 'Runway AI', 'Veo 3.1', 'Kling AI', 'Neo Banana'];

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
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
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{model}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium rounded-full"
          >
            Start Generating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary px-8 py-6 text-base rounded-full"
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
        <div ref={imagesRef} className="flex items-center justify-center gap-4 md:gap-6">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden gradient-border">
              <img
                src={heroPerson1}
                alt="AI generated video content"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              Veo 3.1
            </div>
          </div>
          
          <div className="relative group">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden gradient-border">
              <img
                src={heroPerson2}
                alt="AI video creation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary-foreground fill-current" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
              Runway
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;