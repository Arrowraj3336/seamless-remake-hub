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

      // Cards stagger with 3D effect
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Popular card glow
      gsap.to('.popular-card', {
        boxShadow: '0 0 50px hsl(270 100% 50% / 0.35)',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Background orbs
      gsap.to('.pricing-orb', {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        scale: 'random(0.9, 1.15)',
        duration: 'random(8, 12)',
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
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
      popular: false,
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-blue-500 to-cyan-500',
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
      popular: false,
      icon: <Sparkles className="w-5 h-5" />,
      gradient: 'from-violet-500 to-purple-500',
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
      popular: false,
      isStudio: true,
      icon: <Crown className="w-5 h-5" />,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="pricing-orb absolute top-1/4 left-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="pricing-orb absolute bottom-1/4 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pricing-header opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">30-day money back guarantee</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Simple, <span className="gradient-text text-glow">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-4">
            Choose the plan that fits your creative needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="pricing-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card opacity-0 rounded-2xl p-5 sm:p-6 relative glass border transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? 'popular-card bg-gradient-to-b from-primary/15 to-accent/5 border-primary/50'
                  : plan.isStudio
                  ? 'border-amber-500/30 hover:border-amber-500/50'
                  : 'border-border/30 hover:border-primary/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-glow">
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              {plan.isStudio && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <Crown className="w-3 h-3" />
                  Best Value
                </div>
              )}

              <div className="mb-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-primary font-semibold">
                  {plan.credits}
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-3xl sm:text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm mt-1 text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full transition-all duration-300 text-sm font-semibold group ${
                  plan.popular
                    ? 'btn-futuristic bg-gradient-to-r from-primary via-accent to-cyber-magenta text-white border-0 shadow-glow hover:shadow-glow-intense'
                    : plan.isStudio
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600'
                    : 'bg-secondary/80 text-foreground hover:bg-primary/20 border border-border/50 hover:border-primary/50'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs sm:text-sm mt-10 px-4">
          All plans include access to <span className="text-primary font-medium">Seedance, Runway, Veo 3.1, Kling</span>, and <span className="text-amber-500 font-medium">Neo Banana (free)</span>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
