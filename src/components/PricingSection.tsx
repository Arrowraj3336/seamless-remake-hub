import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Star, Zap, Crown, ArrowRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.pricing-header',
        { opacity: 0, y: 50, filter: 'blur(15px)' },
        {
          opacity: 1,
          y: 0,
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

      // Cards stagger
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Popular card glow pulse
      gsap.to('.popular-card', {
        boxShadow: '0 0 60px hsl(270 100% 50% / 0.4), 0 0 100px hsl(270 100% 50% / 0.2)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating orbs
      gsap.to('.pricing-orb', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        scale: 'random(0.85, 1.2)',
        duration: 'random(10, 15)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      credits: '200 credits',
      description: '~40 videos/month',
      features: [
        'All 5 AI models',
        'HD video quality',
        'No watermarks',
        'Basic support',
        'Cancel anytime',
      ],
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/5 to-cyan-500/5',
    },
    {
      name: 'Creator',
      price: '$39',
      period: '/month',
      credits: '500 credits',
      description: '~100 videos/month',
      features: [
        'All 5 AI models',
        '4K video quality',
        'No watermarks',
        'Priority queue',
        'Priority support',
        'Cancel anytime',
      ],
      popular: true,
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-primary via-accent to-cyber-magenta',
      bgGradient: 'from-primary/10 via-accent/5 to-cyber-magenta/5',
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      credits: '1,400 credits',
      description: '~280 videos/month',
      features: [
        'All 5 AI models',
        '4K video quality',
        'No watermarks',
        'Priority queue',
        'API access',
        'Dedicated support',
        'Cancel anytime',
      ],
      icon: <Sparkles className="w-5 h-5" />,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-500/5 to-purple-500/5',
    },
    {
      name: 'Studio',
      price: '$199',
      period: '/month',
      credits: '3,000 credits',
      description: '~600 videos/month',
      features: [
        'All 5 AI models',
        '4K video quality',
        'No watermarks',
        'Priority queue',
        'API access',
        'Early model access',
        'Dedicated manager',
        'Custom integrations',
      ],
      isStudio: true,
      icon: <Crown className="w-5 h-5" />,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
      
      {/* Animated Orbs */}
      <div className="pricing-orb absolute top-20 left-[5%] w-[400px] h-[400px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="pricing-orb absolute bottom-20 right-[5%] w-[400px] h-[400px] bg-gradient-radial from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="pricing-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 pricing-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 backdrop-blur-xl">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-foreground/80">30-day money back guarantee</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simple,{' '}
            <span className="relative">
              <span className="gradient-text text-glow">Transparent</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-50" />
            </span>{' '}
            Pricing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            Choose the plan that fits your creative needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative rounded-2xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-3 ${
                plan.popular
                  ? 'popular-card bg-gradient-to-b from-primary/15 via-accent/10 to-transparent border-2 border-primary/50'
                  : plan.isStudio
                  ? `bg-gradient-to-b ${plan.bgGradient} border-2 border-amber-500/30 hover:border-amber-500/60`
                  : `glass-strong bg-gradient-to-b ${plan.bgGradient} border border-border/30 hover:border-primary/50`
              }`}
              style={{
                boxShadow: plan.popular 
                  ? '0 20px 50px -10px rgba(139, 92, 246, 0.3)' 
                  : plan.isStudio
                  ? '0 20px 50px -10px rgba(245, 158, 11, 0.2)'
                  : '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white px-5 py-1.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/30">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Most Popular
                </div>
              )}

              {/* Studio Badge */}
              {plan.isStudio && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-1.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30">
                  <Crown className="w-3.5 h-3.5" />
                  Best Value
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs md:text-sm text-primary font-semibold">{plan.credits}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border/20">
                <div className="flex items-baseline gap-1">
                  <span className={`font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs md:text-sm mt-2 text-muted-foreground">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full rounded-xl h-12 transition-all duration-300 text-sm md:text-base font-semibold group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white border-0 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                    : plan.isStudio
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20'
                    : 'bg-gradient-to-r from-primary/10 to-accent/10 text-foreground hover:from-primary/20 hover:to-accent/20 border border-primary/30 hover:border-primary/50'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground text-xs sm:text-sm">
            All plans include access to{' '}
            <span className="text-primary font-semibold">Seedance</span>,{' '}
            <span className="text-cyan-400 font-semibold">Runway</span>,{' '}
            <span className="text-blue-400 font-semibold">Veo 3.1</span>,{' '}
            <span className="text-indigo-400 font-semibold">Kling</span>, and{' '}
            <span className="text-amber-500 font-semibold">Neo Banana (free)</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
