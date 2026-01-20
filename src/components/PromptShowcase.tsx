import { useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import avatarBackground from '@/assets/avatar-background.mp4';

// Using local video assets for reliable playback
import heroVideo1 from '@/assets/hero-video-1.mp4';
import heroVideo2 from '@/assets/hero-video-2.mp4';
import collaborationVideo from '@/assets/collaboration-video.mp4';
import featureVideo from '@/assets/feature-video.mp4';
import aiDemoVideo from '@/assets/ai-demo-video.mp4';
import heroVideoNew from '@/assets/hero-video-new.mp4';

const promptsData = [
  {
    prompt: "A cinematic shot of a woman walking through neon-lit streets",
    video: heroVideo1,
  },
  {
    prompt: "A majestic lion running across the African savanna",
    video: heroVideo2,
  },
  {
    prompt: "Futuristic cityscape with flying cars and holograms",
    video: collaborationVideo,
  },
  {
    prompt: "A serene underwater scene with colorful coral reefs",
    video: featureVideo,
  },
  {
    prompt: "Astronaut floating in space with Earth in background",
    video: aiDemoVideo,
  },
  {
    prompt: "A magical forest with glowing fireflies at twilight",
    video: heroVideoNew,
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
        rotation: '+=1080',
        scale: 1.2,
        duration: 0.8,
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
      // Crossfade: wait until after React commits so the prompt video ref is available
      addTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (backgroundVideoRef.current) {
              // Ensure background is playing before fading
              try {
                void backgroundVideoRef.current.play();
              } catch {
                // ignore
              }

              gsap.to(backgroundVideoRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' });
            }

            if (promptVideoRef.current) {
              // Always mount the prompt video element; set its src right before playing
              try {
                promptVideoRef.current.src = promptsData[currentIndex].video;
                promptVideoRef.current.load();
              } catch {
                // ignore
              }

              const el = promptVideoRef.current;

              // Only fade in once the browser has decoded enough to render a frame
              const fadeInWhenReady = () => {
                gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
              };

              el.addEventListener('canplay', fadeInWhenReady, { once: true });

              // Ensure it actually starts playing (some browsers need an explicit play call)
              try {
                el.currentTime = 0;
                void el.play();
              } catch {
                // ignore
              }

              // Safety fallback: if canplay doesn't fire quickly, still show it
              addTimeout(() => {
                try {
                  if (parseFloat(getComputedStyle(el).opacity || '0') < 0.5) fadeInWhenReady();
                } catch {
                  fadeInWhenReady();
                }
              }, 400);
            }
          });
        });
      }, 0);

      // Show video for 10 seconds then move to next prompt
      addTimeout(() => {
        if (promptVideoRef.current) {
          gsap.to(promptVideoRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              try {
                promptVideoRef.current?.pause();
              } catch {
                // ignore
              }
            },
          });
        }
        if (backgroundVideoRef.current) {
          gsap.to(backgroundVideoRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              setShowPromptVideo(false);
              setCurrentIndex((prev) => (prev + 1) % promptsData.length);
            },
          });
        }
      }, 10000);
    }, 600);
  }, [addTimeout]);

  // Typing animation effect
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
      }, 80); // Slower typing for better readability
    }, 300);

    return clearAllTimeouts;
  }, [currentIndex, animateStarAndShowVideo, addTimeout, clearAllTimeouts]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-6">
      {/* Input container with star button */}
      <div className="relative mb-3 sm:mb-4">
        <div className="relative flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl glass border border-primary/30 bg-background/50 backdrop-blur-xl shadow-lg shadow-primary/10">
          {/* Prompt text display */}
          <div className="flex-1 min-h-[24px] text-sm sm:text-base text-foreground/90 font-medium text-left">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
            )}
          </div>

          {/* Star button */}
          <button
            ref={starRef}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary via-accent to-cyber-magenta flex items-center justify-center shadow-glow transition-all duration-300 hover:shadow-glow-intense will-change-transform"
            style={{ transformOrigin: 'center center' }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Decorative glow under input */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 blur-xl rounded-full" />
      </div>

      {/* Video display area - seamless crossfade */}
      <div className="relative rounded-2xl overflow-hidden gradient-border glow-effect">
        {/* Background video - always mounted, opacity controlled */}
        <video
          ref={backgroundVideoRef}
          src={avatarBackground}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full aspect-video object-cover will-change-[opacity]"
          onError={(e) => {
            console.error('Background video failed:', avatarBackground, e);
          }}
        />

        {/* Prompt video - always mounted overlay (avoids ref timing issues) */}
        <video
          ref={promptVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-[opacity]"
          style={{ opacity: 0 }}
          onError={(e) => {
            console.error('Prompt video failed:', promptsData[currentIndex].video, e);
          }}
        />

        {/* Video overlay with prompt badge */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between pointer-events-none">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass bg-background/60 backdrop-blur-md border border-primary/30">
            <span className="text-xs sm:text-sm font-medium text-foreground/90">
              {showPromptVideo ? 'AI Generated Video' : 'Background Preview'}
            </span>
          </div>
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-medium shadow-lg">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Spectoria AI
          </div>
        </div>
      </div>
    </div>
  );
});

PromptShowcase.displayName = 'PromptShowcase';

export default PromptShowcase;
