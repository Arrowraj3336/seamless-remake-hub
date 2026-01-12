import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Layers, Video, Wand2 } from 'lucide-react';
import aiTechVisual from '@/assets/ai-tech-visual.jpg';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Video className="w-5 h-5 text-primary" />,
      title: 'Seedance AI',
      description: 'Ultra-realistic motion and fluid animations',
    },
    {
      icon: <Wand2 className="w-5 h-5 text-primary" />,
      title: 'Runway AI',
      description: 'Industry-leading video generation quality',
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: 'Veo 3.1',
      description: 'Google\'s most advanced video model',
    },
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      title: 'Kling AI',
      description: 'Exceptional scene understanding and generation',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: 'Neo Banana',
      description: 'Creative and artistic video styles',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="opacity-0">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Access the World's{' '}
              <span className="gradient-text">Best AI Video Models</span>{' '}
              in One Platform
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              SPECTORIA brings together the most powerful AI video generators. From realistic motion to artistic styles, create any video you can imagine.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card hover:bg-secondary transition-colors gradient-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                Explore models
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                View documentation
              </button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="rounded-2xl overflow-hidden gradient-border">
              <img
                src={aiTechVisual}
                alt="AI Video Generation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl gradient-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">5 AI Models</p>
                  <p className="text-xs text-muted-foreground">Ready to generate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;