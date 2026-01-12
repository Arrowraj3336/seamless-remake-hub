import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SnowflakesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const snowflakes = containerRef.current.querySelectorAll('.snowflake');
    
    snowflakes.forEach((flake, i) => {
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 10;
      
      gsap.to(flake, {
        y: window.innerHeight + 100,
        x: `random(-100, 100)`,
        rotation: `random(-180, 180)`,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        repeatRefresh: true,
      });

      gsap.to(flake, {
        opacity: Math.random() * 0.15 + 0.03,
        duration: 2 + Math.random() * 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => {
      gsap.killTweensOf('.snowflake');
    };
  }, []);

  const snowflakeCount = 50;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {[...Array(snowflakeCount)].map((_, i) => (
        <div
          key={i}
          className="snowflake absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: 'hsl(270 100% 80%)',
            borderRadius: '50%',
            opacity: 0.05,
            boxShadow: '0 0 6px hsl(270 100% 70% / 0.3)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

export default SnowflakesBackground;
