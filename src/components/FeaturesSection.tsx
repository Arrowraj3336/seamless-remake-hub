import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Layers, Video, Wand2, ArrowRight } from 'lucide-react';
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
        { opacity: 0, x: -100, rotateY: 15, filter: 'blur(15px)' },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1.2,
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
        { opacity: 0, x: 100, scale: 0.85, filter: 'blur(15px)' },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards stagger with wave effect
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, x: -40, y: 30, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.feature-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating badge with glow
      gsap.to('.feature-badge', {
        y: -15,
        rotation: 5,
        boxShadow: '0 20px 40px hsl(270 100% 50% / 0.3)',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Image subtle float with glow
      gsap.to('.feature-image', {
        y: -20,
        boxShadow: '0 30px 60px hsl(270 100% 50% / 0.2)',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Background orbs
      gsap.to('.feature-orb', {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        opacity: 'random(0.1, 0.3)',
        duration: 'random(5, 8)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
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
    <section ref={sectionRef} id="features" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="feature-orb absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="feature-orb absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center" style={{ perspective: '1000px' }}>
          {/* Content */}
          <div ref={contentRef} className="opacity-0 order-2 md:order-1">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Access the World's{' '}
              <span className="gradient-text text-glow">Best AI Video Models</span>{' '}
              in One Platform
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              SPECTORIA brings together the most powerful AI video generators. From realistic motion to artistic styles, create any video you can imagine.
            </p>

            <div className="feature-list space-y-3 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass border border-border/30 group hover:border-primary/40 hover:-translate-x-1 hover:shadow-glow transition-all duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/20 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <button className="w-full sm:w-auto btn-futuristic px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full font-medium shadow-glow hover:shadow-glow-intense transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                Explore models
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 text-sm sm:text-base py-2">
                View documentation
              </button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative opacity-0 order-1 md:order-2">
            <div className="feature-image rounded-2xl overflow-hidden gradient-border glow-effect">
              <img
                src={aiTechVisual}
                alt="AI Video Generation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="feature-badge absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 glass-strong p-3 sm:p-4 rounded-xl border border-primary/30 shadow-glow">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">5 AI Models</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Ready to generate</p>
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
