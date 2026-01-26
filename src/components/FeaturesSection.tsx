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

      // Workflow steps stagger
      gsap.fromTo(
        '.workflow-step',
        { opacity: 0, x: -30, y: 10 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
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
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
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

  const workflowSteps = [
    {
      number: '1',
      icon: <Brain className="w-4 h-4 text-violet-400" />,
      title: 'AI Planning',
      description: 'GPT breaks your idea into cinematic scenes',
      color: 'from-violet-500 to-purple-600',
    },
    {
      number: '2',
      icon: <LayoutGrid className="w-4 h-4 text-pink-400" />,
      title: 'Storyboard',
      description: 'Preview frames generated for each scene',
      color: 'from-pink-500 to-rose-600',
    },
    {
      number: '3',
      icon: <RefreshCw className="w-4 h-4 text-blue-400" />,
      title: 'Refine & Edit',
      description: "Regenerate any frame until it's perfect",
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '4',
      icon: <Play className="w-4 h-4 text-amber-400" />,
      title: 'Generate',
      description: 'Approved frames become stunning videos',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-4 h-4" />,
      title: 'Save Credits',
      description: 'Fix issues in storyboard before expensive video generation',
      color: 'text-green-400',
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: 'Visual Consistency',
      description: 'Ensure style and mood match across all scenes',
      color: 'text-blue-400',
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: 'Creative Control',
      description: 'Edit prompts and regenerate individual frames',
      color: 'text-purple-400',
    },
  ];

  const aiFeatures = [
    { icon: <Lightbulb className="w-3.5 h-3.5" />, text: 'Smart Prompt Enhancement' },
    { icon: <Camera className="w-3.5 h-3.5" />, text: 'Cinematic camera angles' },
    { icon: <Volume2 className="w-3.5 h-3.5" />, text: 'Audio cues included' },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="feature-orb absolute top-0 right-0 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="feature-orb absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-gradient-radial from-accent/10 via-accent/3 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center" style={{ perspective: '1000px' }}>
          {/* Content */}
          <div ref={contentRef} className="opacity-0 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Storyboard-First Workflow</span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              From Idea to{' '}
              <span className="gradient-text text-glow">Cinematic Video</span>{' '}
              in 4 Steps
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
              Our AI transforms your simple ideas into detailed, cinematic scene descriptions optimized for video generation.
            </p>

            {/* Workflow Steps */}
            <div className="workflow-list space-y-2.5 mb-6">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className="workflow-step flex items-center gap-3 p-3 rounded-xl glass border border-border/20 group hover:border-primary/40 hover:-translate-x-1 transition-all duration-400 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="benefits-grid grid grid-cols-3 gap-2 mb-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card p-3 rounded-xl glass border border-border/20 hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className={`w-8 h-8 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2 ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-xs font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* ChatGPT-4o Badge */}
            <div className="p-3 rounded-xl glass border border-primary/20 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold">Powered by ChatGPT-4o</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="text-primary">{feature.icon}</span>
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full sm:w-auto btn-futuristic px-6 py-3 bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white rounded-full font-semibold shadow-glow hover:shadow-glow-intense transition-all duration-500 flex items-center justify-center gap-2 text-sm group">
              Start Creating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
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
            <div className="feature-badge absolute -bottom-5 sm:-bottom-6 -left-3 sm:-left-6 glass-strong p-3 sm:p-3.5 rounded-xl border border-primary/30 shadow-glow">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold">AI Scene Planner</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Powered by GPT-4o</p>
                </div>
              </div>
            </div>
            
            {/* Additional floating badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
              ✨ Pro Workflow
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
