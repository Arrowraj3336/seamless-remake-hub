import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap, Layers, Video, Wand2, ArrowRight, CheckCircle2 } from 'lucide-react';
import featureVideo from '@/assets/feature-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal with smooth 3D effect
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -60, filter: 'blur(15px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video reveal with parallax
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, x: 60, scale: 0.92, filter: 'blur(15px)' },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Feature cards stagger with smooth wave effect
      gsap.fromTo(
        '.feature-card',
        { opacity: 0, x: -40, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.feature-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating badge with gentle motion
      gsap.to('.feature-badge', {
        y: -15,
        rotation: 4,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Background orbs - smoother
      gsap.to('.feature-orb', {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        opacity: 'random(0.06, 0.18)',
        duration: 'random(10, 15)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Video className="w-5 h-5 text-primary" />,
      title: 'Seedance AI',
      description: 'Cinematic motion with fluid, lifelike animations',
    },
    {
      icon: <Wand2 className="w-5 h-5 text-primary" />,
      title: 'Runway Gen-3',
      description: 'Industry-leading quality with precise control',
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: 'Google Veo 3.1',
      description: "Google's most advanced video AI with audio",
    },
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      title: 'Kling AI',
      description: 'Exceptional scene understanding & creativity',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: 'Neo Banana',
      description: 'Revolutionary image generation — FREE!',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="feature-orb absolute top-0 right-0 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="feature-orb absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-gradient-radial from-accent/10 via-accent/3 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center" style={{ perspective: '1000px' }}>
          {/* Content */}
          <div ref={contentRef} className="opacity-0 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Powered by 5 AI Models</span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 leading-tight">
              Access the World's{' '}
              <span className="gradient-text text-glow">Most Powerful</span>{' '}
              AI Video Models
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
              SPECTORIA unifies the best AI video generators in one seamless platform. From realistic motion to artistic styles, create any video imaginable.
            </p>

            <div className="feature-list space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl glass border border-border/20 group hover:border-primary/40 hover:-translate-x-1 transition-all duration-500 cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/20 group-hover:scale-110 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <button className="w-full sm:w-auto btn-futuristic px-6 py-3 bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-500 flex items-center justify-center gap-2 text-sm sm:text-base group">
                Explore All Models
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto text-muted-foreground hover:text-primary transition-colors duration-300 text-sm sm:text-base py-3 flex items-center justify-center gap-2">
                <span className="underline underline-offset-4">View documentation</span>
              </button>
            </div>
          </div>

          {/* Video */}
          <div ref={videoRef} className="relative opacity-0 order-1 md:order-2">
            <div className="feature-video rounded-2xl overflow-hidden gradient-border glow-effect">
              <video
                src={featureVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="feature-badge absolute -bottom-5 sm:-bottom-6 -left-3 sm:-left-6 glass-strong p-3.5 sm:p-4 rounded-xl border border-primary/30 shadow-glow">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold">5 AI Models</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">All ready to generate</p>
                </div>
              </div>
            </div>
            
            {/* Additional floating badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
              ✨ HD Quality
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
