import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import backgroundVideo from '../assets/hero-video.webm';

// Crucial design cover images to preload concurrently
import aiCover from '../assets/cover/ai.png';
import d2Cover from '../assets/cover/2D.png';
import filmCover from '../assets/cover/film.png';
import adsCover from '../assets/cover/ads.png';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const words = useMemo(() => ["Moka", "Animation", "World"], []);

  // Coordinate current word directly with actual download progress
  const wordIndex = useMemo(() => {
    if (count < 35) return 0;
    if (count < 75) return 1;
    return 2;
  }, [count]);

  useEffect(() => {
    let active = true;

    const preloadAssets = async () => {
      try {
        // 1. Concurrently trigger system fonts, lazy page routes, and critical cover images
        const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();
        
        // Eagerly trigger page dynamic imports in the background to ensure chunk caching
        const routesPromise = Promise.all([
          import('../pages/HomePage'),
          import('../pages/ProjectGridPage'),
        ]);

        // Preload layout images via browser image constructor
        const imagesToPreload = [aiCover, d2Cover, filmCover, adsCover];
        const imagePromises = imagesToPreload.map(src => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        });

        // Preload the two critical background videos natively (avoiding blob URLs, allowing standard cache warming and Range support)
        const videoPromises = [backgroundVideo].map(src => {
          return new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.src = src;
            video.preload = 'auto';
            video.muted = true;
            video.playsInline = true;
            video.oncanplaythrough = () => resolve();
            video.onloadeddata = () => resolve();
            video.onerror = () => resolve();
            // 5 second fallback safety to prevent hanging on slow networks
            setTimeout(resolve, 5000);
          });
        });

        // Set up an intelligent organic loading step counter
        let progress = 0;
        const countInterval = setInterval(() => {
          if (!active) {
            clearInterval(countInterval);
            return;
          }
          if (progress < 85) {
            progress += Math.floor(Math.random() * 3) + 1;
            setCount(Math.min(progress, 85));
          }
        }, 60);

        // Await all critical assets in parallel
        await Promise.all([fontsPromise, routesPromise, ...imagePromises, ...videoPromises]);
        
        clearInterval(countInterval);

        if (active) {
          // Fast tick-up to 100% now that everything is buffered
          let finalProgress = progress;
          const tickUp = setInterval(() => {
            if (!active) {
              clearInterval(tickUp);
              return;
            }
            finalProgress += 4;
            if (finalProgress >= 100) {
              finalProgress = 100;
              clearInterval(tickUp);
              setCount(100);
              setTimeout(onComplete, 400);
            } else {
              setCount(finalProgress);
            }
          }, 15);
        }
      } catch (error) {
        console.warn("Preloading encountered an issue, using emulation:", error);
        let currentProgress = 0;
        const interval = setInterval(() => {
          if (!active) {
            clearInterval(interval);
            return;
          }
          currentProgress += 4;
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setTimeout(onComplete, 450);
          }
          setCount(currentProgress);
        }, 30);
      }
    };

    preloadAssets();

    return () => {
      active = false;
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-sans"
    >
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

      {/* TOP LEFT LABEL */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 left-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#8a8a8a] font-medium">Moka Studio</span>
      </motion.div>

      {/* CENTER SYSTEM */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* DOT */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 ${12 + (count / 100) * 12}px rgba(137,170,204,${0.5 + (count / 100) * 0.3})`,
          }}
          className="w-2.5 h-2.5 rounded-full bg-[#89aacc] relative"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
        </motion.div>

        {/* ROTATING WORDS */}
        <div className="h-[1.2em] relative flex items-center min-w-[180px] md:min-w-[280px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[wordIndex]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: words[wordIndex] === "World" ? 1 : 0.6, 
                y: 0 
              }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic tracking-tight block absolute inset-0 text-white"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* COUNTER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-20 right-10 md:right-20 pointer-events-none"
      >
        <div className="text-[80px] md:text-[140px] lg:text-[180px] font-display text-white tabular-nums leading-none">
          {count.toString().padStart(3, '0')}
        </div>
      </motion.div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          style={{ originX: 0 }}
          className="w-full h-full bg-linear-to-r from-[#5a7a9c] to-[#89aacc] shadow-[0_0_15px_rgba(137,170,204,0.5)]"
        />
      </div>
    </motion.div>
  );
}
