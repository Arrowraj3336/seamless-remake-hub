import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, LayoutGrid, RefreshCw, Play, CreditCard, Eye, Wand2, ArrowRight } from 'lucide-react';
import featureVideo from '@/assets/feature-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.features-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Video animation
      gsap.fromTo(
        '.features-video',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-video',
            start: 'top 85%',
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
            trigger: '.workflow-grid',
            start: 'top 85%',
          },
        }
      );

      // Benefits stagger
      gsap.fromTo(
        '.benefit-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefits-section',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const workflowSteps = [
    {
      number: '01',
      icon: <Brain className="w-5 h-5" />,
      title: 'AI Planning',
      description: 'GPT breaks your idea into cinematic scenes',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      number: '02',
      icon: <LayoutGrid className="w-5 h-5" />,
      title: 'Storyboard',
      description: 'Preview frames generated for each scene',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      number: '03',
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Refine & Edit',
      description: "Regenerate any frame until it's perfect",
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      number: '04',
      icon: <Play className="w-5 h-5" />,
      title: 'Generate',
      description: 'Approved frames become stunning videos',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  const benefits = [
    {
      icon: <CreditCard className="w-4 h-4" />,
      title: 'Save Credits',
      description: 'Fix issues in storyboard before expensive video generation',
    },
    {
      icon: <Eye className="w-4 h-4" />,
      title: 'Visual Consistency',
      description: 'Ensure style and mood match across all scenes',
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: 'Creative Control',
      description: 'Edit prompts and regenerate individual frames',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-[0.02]" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="features-header text-center mb-12 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            From Idea to{' '}
            <span className="gradient-text">Cinematic Video</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Our AI transforms your simple ideas into detailed, cinematic scene descriptions optimized for video generation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 md:mb-16">
          {/* Video */}
          <div className="features-video relative order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
              <video
                src={featureVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="order-2 lg:order-1">
            <div className="workflow-grid grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className="workflow-step group p-4 md:p-5 rounded-xl glass border border-border/30 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-mono text-muted-foreground mt-1">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section grid md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-item flex items-start gap-4 p-4 md:p-5 rounded-xl glass border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base mb-1">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
