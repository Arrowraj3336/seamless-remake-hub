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
      // Content reveal with 3D effect
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -80, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image reveal with parallax
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards stagger
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, x: -30, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.feature-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating badge
      gsap.to('.feature-badge', {
        y: -10,
        rotation: 3,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Image subtle float
      gsap.to('.feature-image', {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
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
    <section ref={sectionRef} id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center" style={{ perspective: '1000px' }}>
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

            <div className="feature-list space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card flex items-start gap-4 p-4 rounded-xl bg-card hover:bg-secondary/80 transition-all duration-300 gradient-border group hover:-translate-x-1 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105">
                Explore models
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                View documentation
              </button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="feature-image rounded-2xl overflow-hidden gradient-border shadow-2xl shadow-primary/10">
              <img
                src={aiTechVisual}
                alt="AI Video Generation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="feature-badge absolute -bottom-6 -left-6 bg-card p-4 rounded-xl gradient-border shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
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