import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import creativeWoman from '@/assets/creative-woman.jpg';
import womanLifestyle from '@/assets/woman-lifestyle.jpg';

gsap.registerPlugin(ScrollTrigger);

const CreativeToolsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.animate-item');
      
      elements?.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left card */}
          <div className="animate-item opacity-0 group rounded-2xl overflow-hidden gradient-border bg-card">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={creativeWoman}
                alt="Text to Video"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Text to Video{' '}
                <span className="gradient-text">Generation</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Describe your vision in words and watch it transform into stunning, professional-quality videos with any of our 5 AI models.
              </p>
              <Button variant="outline" className="rounded-full group/btn">
                Try now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right card */}
          <div className="animate-item opacity-0 group rounded-2xl overflow-hidden gradient-border bg-card">
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={womanLifestyle}
                alt="Image to Video"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                Image to Video{' '}
                <span className="gradient-text">Animation</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Bring your static images to life with realistic motion. Perfect for product showcases, social content, and creative projects.
              </p>
              <Button variant="outline" className="rounded-full group/btn">
                Start creating
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeToolsSection;