import { useEffect, useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import avatarBackground from '@/assets/avatar-background.mp4';

// Using local video assets for reliable playback
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

const TYPING_INTERVAL_MS = 25;
const TYPING_START_DELAY_MS = 80;
const VIDEO_DURATION_MS = 9000;

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
  const sequenceIdRef = useRef(0);

  const clearAllTimeouts = useCallback(() => {
    // invalidate any pending sequence callbacks
    sequenceIdRef.current += 1;
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
    const mySequenceId = (sequenceIdRef.current += 1);

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
      if (sequenceIdRef.current !== mySequenceId) return;
      setShowPromptVideo(true);

      // Start prompt video, but ONLY crossfade once the first frame is ready.
      addTimeout(() => {
        if (sequenceIdRef.current !== mySequenceId) return;
        const bg = backgroundVideoRef.current;
        const pv = promptVideoRef.current;
        if (!bg || !pv) return;

        // Ensure background is playing (kept visible until prompt is ready)
        try {
          void bg.play();
        } catch {
          // ignore
        }

        // Ensure correct source is loaded (it should already be prepared during typing)
        const wantedSrc = promptsData[currentIndex].video;
        try {
          if (!pv.src.endsWith(wantedSrc.split('/').pop() || '')) {
            pv.src = wantedSrc;
            pv.load();
          }
        } catch {
          // ignore
        }

        const crossfadeIn = () => {
          if (sequenceIdRef.current !== mySequenceId) return;
          gsap.to(bg, { opacity: 0, duration: 0.45, ease: 'power2.out' });
          gsap.to(pv, { opacity: 1, duration: 0.45, ease: 'power2.out' });
        };

        const startPlaybackThenCrossfade = () => {
          if (sequenceIdRef.current !== mySequenceId) return;
          try {
            pv.currentTime = 0;
          } catch {
            // ignore
          }

          try {
            const p = pv.play();
            if (p && typeof (p as unknown as Promise<void>).then === 'function') {
              (p as Promise<void>).then(crossfadeIn).catch(crossfadeIn);
            } else {
              crossfadeIn();
            }
          } catch {
            crossfadeIn();
          }
        };

        if (pv.readyState >= 2) {
          startPlaybackThenCrossfade();
        } else {
          pv.addEventListener('loadeddata', startPlaybackThenCrossfade, { once: true });
          // Safety fallback
          addTimeout(() => startPlaybackThenCrossfade(), 600);
        }
      }, 0);

      // Show video for 9 seconds then move to next prompt
      addTimeout(() => {
        if (sequenceIdRef.current !== mySequenceId) return;
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
              if (sequenceIdRef.current !== mySequenceId) return;
              setShowPromptVideo(false);
              setCurrentIndex((prev) => (prev + 1) % promptsData.length);
            },
          });
        }
      }, VIDEO_DURATION_MS);
    }, 600);
  }, [addTimeout, currentIndex]);

  // Typing animation effect
  useEffect(() => {
    const currentPrompt = promptsData[currentIndex].prompt;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    // Preload the next prompt video DURING typing to avoid blank/lag on crossfade.
    if (promptVideoRef.current) {
      const pv = promptVideoRef.current;
      try {
        pv.pause();
      } catch {
        // ignore
      }
      try {
        pv.src = promptsData[currentIndex].video;
        pv.load();
      } catch {
        // ignore
      }
      try {
        pv.currentTime = 0;
      } catch {
        // ignore
      }
      try {
        gsap.set(pv, { opacity: 0 });
      } catch {
        // ignore
      }
    }

    if (backgroundVideoRef.current) {
      try {
        void backgroundVideoRef.current.play();
      } catch {
        // ignore
      }
    }

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
      }, TYPING_INTERVAL_MS);
    }, TYPING_START_DELAY_MS);

    return clearAllTimeouts;
  }, [currentIndex, animateStarAndShowVideo, addTimeout, clearAllTimeouts]);

  return (
    <div className="w-full max-w-xl mx-auto mt-3 sm:mt-5">
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
      <div className="relative rounded-2xl overflow-hidden gradient-border glow-effect h-[170px] sm:h-[220px]">
        {/* Background video - always mounted, opacity controlled */}
        <video
          ref={backgroundVideoRef}
          src={avatarBackground}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain bg-background will-change-[opacity]"
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
          className="absolute inset-0 w-full h-full object-contain bg-background will-change-[opacity]"
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
