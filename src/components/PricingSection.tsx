import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
      price: '$19.00',
      period: '/month',
      description: 'Perfect for individuals getting started',
      features: [
        '50 video generations/month',
        'Basic editing tools',
        '720p export quality',
        'Email support',
      ],
      popular: false,
    },
    {
      name: 'Growing',
      price: '$29.00',
      originalPrice: '$39.00',
      period: '/month',
      description: 'Ideal for growing creators and teams',
      features: [
        '200 video generations/month',
        'Advanced editing tools',
        '1080p export quality',
        'Priority support',
        'Team collaboration',
        'Custom branding',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$49.99',
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited generations',
        'All editing features',
        '4K export quality',
        'Dedicated support',
        'Advanced analytics',
        'API access',
        'Custom integrations',
      ],
      popular: false,
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 pricing-header opacity-0">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Unlock premium <span className="gradient-text">AI tools</span> with a{' '}
            single, flexible subscription.
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="pricing-cards grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card opacity-0 rounded-2xl p-6 md:p-8 ${
                plan.popular
                  ? 'bg-primary text-primary-foreground relative'
                  : 'bg-card gradient-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-foreground px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-heading text-xl font-semibold mb-2 ${plan.popular ? '' : ''}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {plan.period}
                  </span>
                </div>
                {plan.originalPrice && (
                  <span className="text-sm line-through text-primary-foreground/60">
                    {plan.originalPrice}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
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
      </div>
    </section>
  );
};

export default PricingSection;
