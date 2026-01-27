import { useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import avatarBackground from '@/assets/avatar-background.mp4';

import promptVideo1 from '@/assets/prompt-video-1b.mp4';
import promptVideo2 from '@/assets/prompt-video-2b.mp4';
import promptVideo3 from '@/assets/prompt-video-3b.mp4';
import promptVideo4 from '@/assets/prompt-video-4b.mp4';
import promptVideo5 from '@/assets/prompt-video-5b.mp4';

const promptsData = [
  {
    prompt: "Silhouetted camel riders traveling through a desert under a glowing night sky",
    video: promptVideo1,
  },
  {
    prompt: "Spaceship with blue thrusters approaching an orbital station above Earth",
    video: promptVideo2,
  },
  {
    prompt: "Giant space station drifting through an asteroid field in a green nebula",
    video: promptVideo3,
  },
  {
    prompt: "Astronaut walking through a dusty Mars colony toward a satellite dish",
    video: promptVideo4,
  },
  {
    prompt: "Two people riding steampunk hover-cycles toward a futuristic alien city",
    video: promptVideo5,
  },
];

const PromptShowcase = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showPromptVideo, setShowPromptVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const starRef = useRef<HTMLButtonElement>(null);
  const promptVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const typingIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(id => clearTimeout(id));
    timeoutRefs.current = [];
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutRefs.current.push(id);
    return id;
  }, []);

  const animateStarAndShowVideo = useCallback(() => {
    if (starRef.current) {
      gsap.to(starRef.current, {
        rotation: '+=720',
        scale: 1.15,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(starRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        },
      });
    }

    addTimeout(() => {
      setShowPromptVideo(true);
      addTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (backgroundVideoRef.current) {
              try {
                void backgroundVideoRef.current.play();
              } catch { /* ignore */ }
              gsap.to(backgroundVideoRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' });
            }

            if (promptVideoRef.current) {
              try {
                promptVideoRef.current.src = promptsData[currentIndex].video;
                promptVideoRef.current.load();
              } catch { /* ignore */ }

              const el = promptVideoRef.current;

              const fadeInWhenReady = () => {
                gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
              };

              el.addEventListener('canplay', fadeInWhenReady, { once: true });

              try {
                el.currentTime = 0;
                void el.play();
              } catch { /* ignore */ }

              addTimeout(() => {
                try {
                  if (parseFloat(getComputedStyle(el).opacity || '0') < 0.5) fadeInWhenReady();
                } catch {
                  fadeInWhenReady();
                }
              }, 300);
            }
          });
        });
      }, 0);

      addTimeout(() => {
        if (promptVideoRef.current) {
          gsap.to(promptVideoRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              try {
                promptVideoRef.current?.pause();
              } catch { /* ignore */ }
            },
          });
        }
        if (backgroundVideoRef.current) {
          gsap.to(backgroundVideoRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              setShowPromptVideo(false);
              setCurrentIndex((prev) => (prev + 1) % promptsData.length);
            },
          });
        }
      }, 10000);
    }, 500);
  }, [addTimeout, currentIndex]);

  useEffect(() => {
    const currentPrompt = promptsData[currentIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    addTimeout(() => {
      typingIntervalRef.current = window.setInterval(() => {
        if (charIndex < currentPrompt.length) {
          setDisplayedText(currentPrompt.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
          animateStarAndShowVideo();
        }
      }, 35);
    }, 100);

    return clearAllTimeouts;
  }, [currentIndex, animateStarAndShowVideo, addTimeout, clearAllTimeouts]);

  return (
    <div className="w-full">
      {/* Input Container */}
      <div className="relative mb-6 md:mb-8">
        <div className="relative flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl glass border border-border/50 bg-card/50">
          <div className="flex-1 min-h-[24px] text-sm md:text-base text-foreground/90 font-medium text-left">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 md:h-5 bg-primary ml-0.5 animate-pulse" />
            )}
          </div>
          <button
            ref={starRef}
            className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-glow will-change-transform"
            style={{ transformOrigin: 'center center' }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Video Display */}
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-border/30 shadow-2xl" style={{ aspectRatio: '14/9' }}>
        <video
          ref={backgroundVideoRef}
          src={avatarBackground}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-[opacity]"
          onError={(e) => console.error('Background video failed:', e)}
        />

        <video
          ref={promptVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-[opacity]"
          style={{ opacity: 0 }}
          onError={(e) => console.error('Prompt video failed:', e)}
        />

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Bottom Labels */}
        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex items-center justify-between pointer-events-none">
          <div className="px-3 py-1.5 rounded-full glass-strong text-xs md:text-sm font-medium">
            {showPromptVideo ? '✨ AI Generated' : '🎬 Preview'}
          </div>
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/90 to-accent/90 text-white text-xs md:text-sm font-semibold shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Spectoria AI
          </div>
        </div>
      </div>
    </div>
  );
});

PromptShowcase.displayName = 'PromptShowcase';

export default PromptShowcase;
