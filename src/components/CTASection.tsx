import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import statsBg from '@/assets/stats-bg.jpg';
import vintageInterior from '@/assets/vintage-interior.jpg';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoother floating dots
      gsap.utils.toArray('.cta-dot').forEach((dot: any, i) => {
        gsap.to(dot, {
          y: 'random(-80, 80)',
          x: 'random(-40, 40)',
          duration: 'random(18, 28)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.08,
        });
      });

      // Smoother content animation
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Images animation
      gsap.fromTo(
        '.cta-image',
        { opacity: 0, scale: 0.85, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.cta-images',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for images
      gsap.to('.cta-image-1', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.cta-image-2', {
        y: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 section-gradient-3 overflow-hidden">
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="cta-dot absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 dots-pattern opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <div className="cta-content opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">SPECTORIA</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Start Creating{' '}
              <span className="gradient-text">AI Videos</span> Today
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Join thousands of creators using SPECTORIA to generate stunning videos with Seedance, Runway, Veo 3.1, Kling, and Neo Banana.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {['Seedance', 'Runway', 'Veo 3.1', 'Kling', 'Neo Banana'].map((model) => (
                <div
                  key={model}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>{model}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white border-0 rounded-full px-8 py-6 shadow-glow hover:shadow-glow-intense font-medium"
              >
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-medium"
              >
                View pricing
              </Button>
            </div>
          </div>

          {/* Right images */}
          <div className="cta-images grid grid-cols-2 gap-4">
            <div className="cta-image cta-image-1 opacity-0 rounded-2xl overflow-hidden h-48 md:h-64 gradient-border">
              <img
                src={statsBg}
                alt="AI generated video"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="cta-image cta-image-2 opacity-0 rounded-2xl overflow-hidden h-48 md:h-64 mt-8 gradient-border">
              <img
                src={vintageInterior}
                alt="AI video content"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
