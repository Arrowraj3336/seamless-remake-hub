import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, LayoutGrid, RefreshCw, Play, Sparkles, CreditCard, Eye, Wand2, ArrowRight, Lightbulb, Camera, Volume2 } from 'lucide-react';
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
        { opacity: 0, x: -40, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
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
        { opacity: 0, x: 40, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Workflow steps stagger
      gsap.fromTo(
        '.workflow-step',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.workflow-list',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Benefit cards stagger
      gsap.fromTo(
        '.benefit-card',
        { opacity: 0, y: 15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating badge with gentle motion
      gsap.to('.feature-badge', {
        y: -12,
        rotation: 3,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Background orbs
      gsap.to('.feature-orb', {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        opacity: 'random(0.08, 0.15)',
        duration: 'random(10, 14)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const workflowSteps = [
    {
      number: '1',
      icon: <Brain className="w-4 h-4" />,
      title: 'AI Planning',
      description: 'GPT breaks your idea into cinematic scenes',
      gradient: 'from-violet-500 to-purple-600',
      glowColor: 'shadow-violet-500/30',
    },
    {
      number: '2',
      icon: <LayoutGrid className="w-4 h-4" />,
      title: 'Storyboard',
      description: 'Preview frames generated for each scene',
      gradient: 'from-pink-500 to-rose-600',
      glowColor: 'shadow-pink-500/30',
    },
    {
      number: '3',
      icon: <RefreshCw className="w-4 h-4" />,
      title: 'Refine & Edit',
      description: "Regenerate any frame until it's perfect",
      gradient: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/30',
    },
    {
      number: '4',
      icon: <Play className="w-4 h-4" />,
      title: 'Generate',
      description: 'Approved frames become stunning videos',
      gradient: 'from-amber-500 to-orange-500',
      glowColor: 'shadow-amber-500/30',
    },
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-4 h-4" />,
      title: 'Save Credits',
      description: 'Fix issues before video generation',
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: 'Visual Consistency',
      description: 'Match style across all scenes',
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: 'Creative Control',
      description: 'Edit and regenerate frames',
    },
  ];

  const aiFeatures = [
    { icon: <Lightbulb className="w-3 h-3" />, text: 'Smart prompts' },
    { icon: <Camera className="w-3 h-3" />, text: 'Camera angles' },
    { icon: <Volume2 className="w-3 h-3" />, text: 'Audio cues' },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="feature-orb absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-radial from-primary/12 via-primary/4 to-transparent rounded-full blur-3xl" />
      <div className="feature-orb absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-radial from-accent/8 via-accent/2 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="opacity-0 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] sm:text-xs font-medium text-muted-foreground">Storyboard-First Workflow</span>
            </div>
            
            {/* Title */}
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
              From Idea to{' '}
              <span className="gradient-text text-glow">Cinematic Video</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-5 leading-relaxed max-w-lg">
              Our AI transforms your ideas into detailed, cinematic scene descriptions optimized for video generation.
            </p>

            {/* Workflow Steps */}
            <div className="workflow-list grid grid-cols-2 gap-2 sm:gap-3 mb-5">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`workflow-step group relative p-3 sm:p-4 rounded-xl glass border border-border/30 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg ${step.glowColor}`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                        {step.number}
                      </div>
                      <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Row */}
            <div className="benefits-grid flex flex-wrap gap-2 mb-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card flex items-center gap-2 px-3 py-2 rounded-full glass border border-border/30 hover:border-primary/40 transition-all duration-300"
                >
                  <span className="text-primary">{benefit.icon}</span>
                  <div>
                    <span className="text-[10px] sm:text-xs font-medium">{benefit.title}</span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground ml-1.5 hidden sm:inline">— {benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ChatGPT-4o Badge */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl glass border border-primary/20 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold">Powered by ChatGPT-4o</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground">
                    <span className="text-primary">{feature.icon}</span>
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full sm:w-auto btn-futuristic px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-500 flex items-center justify-center gap-2 text-xs sm:text-sm group">
              Start Creating
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Video */}
          <div ref={videoRef} className="relative opacity-0 order-1 lg:order-2">
            <div className="feature-video rounded-2xl overflow-hidden gradient-border glow-effect" style={{ aspectRatio: '4/3' }}>
              <video
                src={featureVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badge - bottom left */}
            <div className="feature-badge absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-4 glass-strong p-2.5 sm:p-3 rounded-xl border border-primary/30 shadow-glow">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold">AI Scene Planner</p>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground">Powered by GPT-4o</p>
                </div>
              </div>
            </div>
            
            {/* Top right badge */}
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] sm:text-xs font-semibold shadow-lg">
              ✨ Pro Workflow
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
