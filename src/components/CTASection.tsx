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
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.cta-image',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.cta-images',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <div className="cta-content opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-heading font-bold">SPECTORIA</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Creating{' '}
              <span className="gradient-text">AI Videos</span> Today
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Join thousands of creators using SPECTORIA to generate stunning videos with Seedance, Runway, Veo 3.1, Kling, and Neo Banana.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {['Seedance', 'Runway', 'Veo 3.1', 'Kling', 'Neo Banana'].map((model) => (
                <div
                  key={model}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-xs"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>{model}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              >
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                View pricing
              </Button>
            </div>
          </div>

          {/* Right images */}
          <div className="cta-images grid grid-cols-2 gap-4">
            <div className="cta-image opacity-0 rounded-2xl overflow-hidden h-48 md:h-64 gradient-border">
              <img
                src={statsBg}
                alt="AI generated video"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="cta-image opacity-0 rounded-2xl overflow-hidden h-48 md:h-64 mt-8 gradient-border">
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