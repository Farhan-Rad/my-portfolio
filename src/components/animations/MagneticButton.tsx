'use client';
import { useRef, useEffect, useState, type MouseEvent } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className, as: Tag = 'button', href, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || isTouchDevice) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current || isTouchDevice) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Comp = Tag;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Comp
        href={href}
        onClick={onClick}
        className={className}
        {...(Tag === 'a' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Comp>
    </div>
  );
}
