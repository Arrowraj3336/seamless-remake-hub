import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      credits: '200 monthly credits',
      description: 'Up to 40 videos/month',
      features: [
        'Seedance model',
        'Veo 3.1 model',
        'Runway model',
        'Kling model',
        'Priority generation',
        'No-watermark outputs',
        'Priority support',
        'Cancel anytime',
      ],
      popular: false,
    },
    {
      name: 'Creator',
      price: '$39',
      period: '/month',
      credits: '500 monthly credits',
      description: 'Up to 100 videos/month',
      features: [
        'Seedance model',
        'Veo 3.1 model',
        'Runway model',
        'Kling model',
        'Priority generation',
        'No-watermark outputs',
        'Priority support',
        'Cancel anytime',
      ],
      popular: true,
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      credits: '1,400 monthly credits',
      description: 'Up to 280 videos/month',
      features: [
        'Seedance model',
        'Veo 3.1 model',
        'Runway model',
        'Kling model',
        'Priority generation',
        'No-watermark outputs',
        'Priority support',
        'Cancel anytime',
      ],
      popular: false,
    },
    {
      name: 'Studio',
      price: '$199',
      period: '/month',
      credits: '3,000 monthly credits',
      description: 'Up to 600 videos/month',
      features: [
        'Seedance model',
        'Veo 3.1 model',
        'Runway model',
        'Kling model',
        'Priority generation',
        'Priority Access to newer models',
        'No-watermark outputs',
        'Priority support',
        'Cancel anytime',
      ],
      popular: false,
      isStudio: true,
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 pricing-header opacity-0">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Creative Power</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Access all premium AI models with flexible plans. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="pricing-cards grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card opacity-0 rounded-2xl p-6 relative ${
                plan.popular
                  ? 'bg-primary text-primary-foreground'
                  : plan.isStudio
                  ? 'bg-gradient-to-b from-accent/20 to-card gradient-border'
                  : 'bg-card gradient-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  Most Popular
                </div>
              )}

              {plan.isStudio && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Best Value
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-heading text-xl font-semibold mb-1">
                  {plan.name}
                </h3>
                <p className={`text-xs ${plan.popular ? 'text-primary-foreground/80' : 'text-primary'}`}>
                  {plan.credits}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? '' : 'text-primary'}`} />
                    <span className={plan.popular ? 'text-primary-foreground/90' : ''}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full ${
                  plan.popular
                    ? 'bg-background text-foreground hover:bg-background/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                Get started
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          All plans include access to Seedance, Runway, Veo 3.1, Kling, and Neo Banana models
        </p>
      </div>
    </section>
  );
};

export default PricingSection;