import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import Magnetic from './Magnetic';
import img1 from '../assets/floating/1.jpg';
import img2 from '../assets/floating/2.png';
import img3 from '../assets/floating/3.png';
import img4 from '../assets/floating/4.jpg';
import img5 from '../assets/floating/5.jpg';
import img6 from '../assets/floating/6.jpg';
import img7 from '../assets/floating/7.jpg';
import img8 from '../assets/floating/8.png';
import img9 from '../assets/floating/9.jpg';
import img10 from '../assets/floating/10.png';
import img11 from '../assets/floating/11.png';


interface FloatingItem {
  id: number;
  src: string;
  size: number;
  initialPos: { top?: string; left?: string; right?: string; bottom?: string };
  targetPos: { x: number; y: number }; // Relative to center
  name: string;
}

const floatingItems: FloatingItem[] = [
  { id: 1, src: img1, size: 76, initialPos: { top: '12%', left: '12%' }, targetPos: { x: -120, y: -60 }, name: "The Basement Records" },
  { id: 2, src: img2, size: 64, initialPos: { top: '8%', left: '42%' }, targetPos: { x: -10, y: -130 }, name: "nnc" },
  { id: 3, src: img3, size: 70, initialPos: { top: '14%', right: '12%' }, targetPos: { x: 130, y: -70 }, name: "Okhtbout" },
  { id: 4, src: img4, size: 64, initialPos: { top: '42%', left: '6%' }, targetPos: { x: -160, y: 10 }, name: "Myriorama" },
  { id: 5, src: img5, size: 76, initialPos: { top: '35%', right: '8%' }, targetPos: { x: 160, y: 15 }, name: "Moro" },
  { id: 6, src: img6, size: 68, initialPos: { bottom: '16%', left: '10%' }, targetPos: { x: -130, y: 90 }, name: "Concave" },
  { id: 7, src: img7, size: 60, initialPos: { bottom: '12%', left: '38%' }, targetPos: { x: -30, y: 160 }, name: "MBC3" },
  { id: 8, src: img8, size: 76, initialPos: { bottom: '15%', right: '14%' }, targetPos: { x: 110, y: 110 }, name: "Oka" },
  { id: 9, src: img9, size: 64, initialPos: { top: '50%', right: '4%' }, targetPos: { x: 190, y: -20 }, name: "Tahalip studio" },
  { id: 10, src: img10, size: 70, initialPos: { top: '24%', left: '26%' }, targetPos: { x: -60, y: -90 }, name: "Mousv" },
  { id: 11, src: img11, size: 64, initialPos: { bottom: '26%', right: '28%' }, targetPos: { x: 70, y: 70 }, name: "Samawah" },
];

export default function Collaborations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Floating items inward movement on scroll
  const ecosystemScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  return (
    <div id="social-section" ref={containerRef} className="relative h-[100vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* FLOATING ECOSYSTEM */}
        <motion.div 
          style={{ scale: ecosystemScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          {/* Floating Images */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingItems.map((item) => {
              // Subtle movement based on scroll
              const xMove = useTransform(smoothProgress, [0, 1], [0, item.targetPos.x * 0.5]);
              const yMove = useTransform(smoothProgress, [0, 1], [0, item.targetPos.y * 0.5]);

              const style: any = { ...item.initialPos };
              
              return (
                <Magnetic key={item.id} strength={0}>
                  <motion.div
                    style={{
                      ...style,
                      width: item.size,
                      height: item.size,
                      position: 'absolute',
                      x: xMove,
                      y: yMove,
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative pointer-events-auto cursor-pointer z-30"
                  >
                    <motion.div
                      animate={{
                        y: [0, 12, 0, -12, 0],
                        x: [0, -8, 0, 8, 0],
                      }}
                      transition={{
                        duration: 8 + (item.id % 4) * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.id * 0.5
                      }}
                      data-cursor="view"
                      className="w-full h-full"
                    >
                      {/* The image container itself which has overflow-hidden */}
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-full h-full rounded-xl overflow-hidden liquid-glass shadow-2xl glass-sweep"
                      >
                        <img src={item.src} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                    </motion.div>

                    {/* Styled professional name tag on hover */}
                    <AnimatePresence>
                      {hoveredId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-neutral-900/95 border border-white/10 text-[10px] md:text-[11px] text-white px-2.5 py-1 rounded-full whitespace-nowrap shadow-xl backdrop-blur-md font-sans font-medium pointer-events-none tracking-wider z-50 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {item.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Magnetic>
              );
            })}
          </div>

          <div className="max-w-[720px] relative z-20 pointer-events-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight text-foreground leading-[1.1]">
              You don’t just watch motion<br />
              <span className="text-foreground/80 italic font-serif">you become part of it</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-[540px] mx-auto leading-relaxed">
              A network of creators, brands, and stories brought to life through motion.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
