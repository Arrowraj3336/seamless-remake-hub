import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'models', label: 'Models' },
  { id: 'collaboration', label: 'Create' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
];

const ScrollProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group flex items-center gap-2"
        >
          <span
            className={`text-xs font-medium transition-all duration-300 ${
              activeSection === id
                ? 'opacity-100 text-primary translate-x-0'
                : 'opacity-0 text-muted-foreground translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {label}
          </span>
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === id
                ? 'bg-primary scale-125 shadow-glow'
                : 'bg-muted-foreground/40 group-hover:bg-primary/60'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ScrollProgressIndicator;
