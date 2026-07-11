'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

type Phase = 'idle' | 'flying' | 'active' | 'returning';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [overlayColor, setOverlayColor] = useState('');

  const isDark = theme === 'dark';

  const handleToggle = useCallback(() => {
    if (phase !== 'idle') return;

    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = Math.round(rect.left + rect.width / 2);
    const cy = Math.round(rect.top + rect.height / 2);
    setOrigin({ x: cx, y: cy });
    setOverlayColor(isDark ? '#ffffff' : '#030712');
    setPhase('flying');
  }, [phase, isDark]);

  const onArrive = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
    setPhase('active');
  }, [isDark, setTheme]);

  useEffect(() => {
    if (phase === 'active') {
      const timer = setTimeout(() => setPhase('returning'), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === 'returning') {
      const timer = setTimeout(() => setPhase('idle'), 600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  const overlayVisible = phase === 'flying' || phase === 'active';

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className={`relative rounded-full p-2 text-muted-foreground transition-all duration-300 hover:bg-accent/10 hover:text-accent ${
          phase === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {phase !== 'idle' && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <div
            className="absolute"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <motion.button
              className="rounded-full p-3 text-foreground bg-background/80 backdrop-blur-sm"
              initial={{
                opacity: 0,
                x: origin.x - centerX,
                y: origin.y - centerY,
                scale: 1,
              }}
              animate={
                phase === 'returning'
                  ? { scale: 0, opacity: 0 }
                  : { x: 0, y: 0, scale: 1.5, opacity: 1 }
              }
              transition={
                phase === 'returning'
                  ? { duration: 0.5, ease: 'easeInOut' }
                  : { type: 'spring', stiffness: 100, damping: 20, mass: 1 }
              }
              onAnimationComplete={() => {
                if (phase === 'flying') onArrive();
              }}
            >
              <motion.div
                animate={{ rotate: phase === 'active' ? 360 : 0 }}
                transition={
                  phase === 'active'
                    ? { duration: 1.2, ease: 'easeInOut' }
                    : { duration: 0 }
                }
              >
                {isDark ? <Sun size={28} /> : <Moon size={28} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={overlayVisible ? { scale: 1 } : { scale: 0 }}
        transition={
          overlayVisible
            ? { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
            : { duration: 0.5, ease: 'easeInOut' }
        }
        className="fixed rounded-full z-[150] pointer-events-none"
        style={{
          left: `calc(${origin.x}px - 100vmax)`,
          top: `calc(${origin.y}px - 100vmax)`,
          width: '200vmax',
          height: '200vmax',
          backgroundColor: overlayColor,
        }}
      />
    </>
  );
}
