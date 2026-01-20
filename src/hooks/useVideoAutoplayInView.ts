import { useEffect } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Plays a muted <video> only when it's near/in the viewport, pausing it when offscreen.
 * This reduces CPU/GPU decoding work and removes a lot of page-wide jank.
 */
export function useVideoAutoplayInView(
  ref: React.RefObject<HTMLVideoElement>,
  options: Options = {}
) {
  const { rootMargin = "200px 0px", threshold = 0.15 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          try {
            el.preload = "auto";
          } catch {
            // ignore
          }

          try {
            const p = el.play();
            if (p && typeof (p as unknown as Promise<void>).catch === "function") {
              (p as Promise<void>).catch(() => void 0);
            }
          } catch {
            // ignore
          }
        } else {
          try {
            el.pause();
          } catch {
            // ignore
          }
        }
      },
      { rootMargin, threshold }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      try {
        el.pause();
      } catch {
        // ignore
      }
    };
  }, [ref, rootMargin, threshold]);
}
