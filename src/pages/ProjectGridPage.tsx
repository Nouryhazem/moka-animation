import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, X } from 'lucide-react';

import aiVideo1 from '../assets/ai/vid0.webm';
import aiVideo2 from '../assets/ai/vid1.webm';
import aiVideo3 from '../assets/ai/vid2.webm';
import aiVideo4 from '../assets/ai/vid3.webm';
import aiVideo5 from '../assets/ai/vid4.webm';
import aiVideo6 from '../assets/ai/vid5.webm';
import aiVideo7 from '../assets/ai/vid6.webm';
import aiVideo8 from '../assets/ai/vid7.webm';
import aiVideo9 from '../assets/ai/vid8.webm';
import aiVideo10 from '../assets/ai/vid9.webm';
import aiVideo12 from '../assets/ai/vid12.webm';

import d2Video1 from '../assets/2d/vid1.webm';
import d2Video2 from '../assets/2d/vid2.webm';
import d2Video3 from '../assets/2d/vid3.webm';
import d2Video4 from '../assets/2d/vid4.webm';
import d2Video5 from '../assets/2d/vid5.webm';
import d2Video6 from '../assets/2d/vid6.webm';
import d2Video7 from '../assets/2d/vid7.webm';
import d2Video8 from '../assets/2d/vid8.webm';
import d2Video9 from '../assets/2d/vid9.webm';
import d2Video10 from '../assets/2d/vid10.webm';

import filmVideo1 from '../assets/film/vid1.webm';
import filmVideo2 from '../assets/film/vid2.webm';
import filmVideo3 from '../assets/film/vid3.webm';
import filmVideo4 from '../assets/film/vid4.webm';

import adsVideo3 from '../assets/ads/vid3.webm';
import adsVideo4 from '../assets/ads/vid4.webm';
import adsVideo5 from '../assets/ads/vid5.webm';
import adsVideo7 from '../assets/ads/vid7.webm';

import aiCover from '../assets/cover/ai.png';
import d2Cover from '../assets/cover/2D.png';
import filmCover from '../assets/cover/film.png';
import adsCover from '../assets/cover/ads.png';

import { Project, CategoryData } from '../types';

const getPosterImage = (category: string): string => {
  const cat = category.toLowerCase();
  if (cat.includes('ai')) return aiCover;
  if (cat.includes('2d')) return d2Cover;
  if (cat.includes('film') || cat.includes('cinematic')) return filmCover;
  if (cat.includes('ads') || cat.includes('moro') || cat.includes('vivo') || cat.includes('commercial')) return adsCover;
  return '';
};

const categoryData: Record<string, CategoryData> = {
  ai: {
    title: 'AI Projects',
    projects: [
      { id: 1, title: 'Zoz Real Star', category: 'Loman', video: aiVideo1, aspectRatio: 'square' },
      { id: 2, title: 'tshivo', category: 'Hara', video: aiVideo2, aspectRatio: 'portrait' },
      { id: 3, title: 'Oka', category: 'Oka by7arb El Mll', video: aiVideo3, aspectRatio: 'wide' },
      { id: 4, title: 'Mousv', category: 'AI', video: aiVideo4, aspectRatio: 'portrait' },
      { id: 5, title: 'K.Anani', category: 'Nar', video: aiVideo5, aspectRatio: 'square' },
      { id: 6, title: 'tshivo', category: 'Van gogh', video: aiVideo6, aspectRatio: 'wide' },
      { id: 7, title: 'Mousv', category: 'Mg3bd', video: aiVideo7, aspectRatio: 'portrait' },
      { id: 8, title: 'Mousv', category: 'Do not Call Me Today', video: aiVideo8, aspectRatio: 'square' },
      { id: 9, title: 'Mousv', category: 'Do not Call Me Today', video: aiVideo9, aspectRatio: 'wide' },
      { id: 10, title: 'Zoz Real Star', category: '3la Ma2ask', video: aiVideo10, aspectRatio: 'portrait' },
      { id: 12, title: 'Mousv', category: 'Ana Hena', video: aiVideo12, aspectRatio: 'wide' },
    ]
  },
  '2d': {
    title: '2D Animation',
    projects: [
      { id: 11, title: 'Mousv', category: 'El Gded Shded', video: d2Video1, aspectRatio: 'portrait' },
      { id: 12, title: 'Samawah Studio', category: 'Series Assaf', video: d2Video2, aspectRatio: 'wide' },
      { id: 13, title: 'Yhya & Knoz', category: 'Myrorama Production', video: d2Video3, aspectRatio: 'square' },
      { id: 14, title: 'Promo', category: 'Moka Animation', video: d2Video4, aspectRatio: 'square' },
      { id: 15, title: 'Series ElAhrof', category: 'Artful Media', video: d2Video5, aspectRatio: 'portrait' },
      { id: 16, title: '2D project', category: 'Moka Animation', video: d2Video6, aspectRatio: 'wide' },
      { id: 17, title: 'Series ElAhrof', category: 'Artful Media', video: d2Video7, aspectRatio: 'portrait' },
      { id: 18, title: 'Series ElAhrof', category: 'Artful Media', video: d2Video8, aspectRatio: 'square' },
      { id: 19, title: 'Series ElAhrof', category: 'Artful Media', video: d2Video9, aspectRatio: 'wide' },
      { id: 20, title: 'Mr.chips', category: 'Animatex', video: d2Video10, aspectRatio: 'portrait' },
    ]
  },
  films: {
    title: 'Films',
    projects: [
      { id: 21, title: 'Oops!', category: 'Animatex', video: filmVideo1, aspectRatio: 'wide' },
      { id: 22, title: 'MR.Chips', category: 'Animatex', video: filmVideo2, aspectRatio: 'portrait' },
      { id: 23, title: 'Kalaks', category: 'Animatex', video: filmVideo3, aspectRatio: 'square' },
      { id: 24, title: 'Contrast', category: 'Graduation Project', video: filmVideo4, aspectRatio: 'square' },
    ]
  },
  ads: {
    title: 'Commercial Ads',
    projects: [
      { id: 33, title: 'خليك دايمًا في المقدمة 🏁', category: 'vivo Y31d', video: adsVideo3, aspectRatio: 'portrait' },
      { id: 34, title: ' المعركة مع الأداء القوي ', category: 'vivo Y31d', video: adsVideo4, aspectRatio: 'wide' },
      { id: 35, title: 'سيطر على المباراة من أول دقيقة', category: 'vivo Y31d', video: adsVideo5, aspectRatio: 'wide' },
      { id: 37, title: 'إعلان مورو', category: 'Cadbury Moro', video: adsVideo7, aspectRatio: 'portrait' },
    ]
  }
};

const transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1]
};

export default function ProjectGridPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const data = categoryData[category?.toLowerCase() || ''];

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Category not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center px-6 bg-background/80 backdrop-blur-md border-b border-white/5">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <ArrowLeft size={14} />
          Back
        </button>

        <h1 className="flex-1 text-center text-sm uppercase tracking-widest">
          {data.title}
        </h1>
      </header>

      {/* Grid */}
      <main className="pt-32 px-6 max-w-[1400px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {data.projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
              categoryKey={category || ''}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X size={28} />
            </button>

            <motion.video
              src={selectedProject.video}
              autoPlay
              playsInline
              controls
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl z-40 cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  index: number;
  onClick: () => void;
  categoryKey: string;
}

function ProjectCard({ project, index, onClick, categoryKey }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isCurrentlyHovered = useRef(false);
  
  // Guard seeking loops with an initialization ref to ensure seeking runs exactly once
  const hasInitialized = useRef(false);

  // Free memory and abort playing on unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        try {
          video.pause();
          video.src = '';
          video.load();
        } catch (err) {}
      }
    };
  }, []);

  const getTargetCoverTime = (duration: number): number => {
    if (!duration || isNaN(duration)) return 0;
    // Senior design pattern: if video is short, seek to (duration - 0.5) to keep it from entering an "ended" state.
    // If a media element plays from an "ended" state on play(), some engines restart the media pipeline from scratch (force-reloading).
    if (duration <= 5) {
      return Math.max(0, duration - 0.5);
    }
    return 5;
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (hasInitialized.current) return;

    if (video && video.duration && !isNaN(video.duration)) {
      hasInitialized.current = true;
      const targetTime = getTargetCoverTime(video.duration);
      video.currentTime = targetTime;
      setVideoLoaded(true);
    }
  };

  const handleEnter = () => {
    setIsHovered(true);
    isCurrentlyHovered.current = true;
    const video = videoRef.current;
    if (!video) return;

    const startPlay = () => {
      if (!isCurrentlyHovered.current) return;
      
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromiseRef.current = playPromise;
        playPromise
          .then(() => {
            if (!isCurrentlyHovered.current) {
              video.pause();
            }
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn("Hover play promise rejected:", err);
            }
          });
      }
    };

    startPlay();
  };

  const handleLeave = () => {
    setIsHovered(false);
    isCurrentlyHovered.current = false;
    const video = videoRef.current;
    if (!video) return;

    const resetToCover = () => {
      if (video.duration && !isNaN(video.duration)) {
        const targetTime = getTargetCoverTime(video.duration);
        // Performance optimization: only trigger a heavy media seek if we played more than 0.5s past the target.
        // This eliminates redundant seeking Range requests for micro-hover/rapid-leave gestures.
        if (Math.abs(video.currentTime - targetTime) > 0.5) {
          video.currentTime = targetTime;
        }
      }
    };

    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          if (!isCurrentlyHovered.current) {
            video.pause();
            resetToCover();
          }
        })
        .catch(() => {
          video.pause();
          resetToCover();
        });
    } else {
      try {
        video.pause();
        resetToCover();
      } catch (err) {}
    }
  };

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[9/16]',
    wide: 'aspect-[16/9]'
  }[project.aspectRatio];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...transition, delay: index * 0.05 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      className={`relative ${aspectClass} rounded-xl overflow-hidden cursor-pointer break-inside-avoid mb-6 group bg-neutral-900 border border-white/5 shadow-lg hover:shadow-2xl hover:shadow-black/70 transition-shadow duration-500`}
    >
      {/* Video element showing the high-fidelity native video middle frame */}
      <video
        ref={videoRef}
        src={project.video}
        onLoadedMetadata={handleLoadedMetadata}
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-out ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        } group-hover:scale-[1.06]`}
      />

      {/* Dynamic Overlay utilizing pure CSS transition on group hover */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100" />

      {/* Info panel with custom tracking and translate-y transitions */}
      <div className="absolute bottom-4 left-4 text-white transition-all duration-300 pointer-events-none pr-8 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-left">
        <h3 dir="auto" className="font-medium text-sm md:text-base leading-snug">{project.title}</h3>
        <p className="text-xs text-white/70 mt-1">{project.category}</p>
      </div>

      {/* Play indicator */}
      <div className="absolute top-4 right-4 transition-all duration-300 pointer-events-none text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100">
        <Play size={16} fill="currentColor" />
      </div>
    </motion.div>
  );
}