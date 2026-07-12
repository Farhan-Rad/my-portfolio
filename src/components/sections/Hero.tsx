'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ChevronDown, MapPin, Circle } from 'lucide-react';
import { profile } from '@/data/profile';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { HeroScene } from '@/components/three/HeroScene';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.title-char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 80, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  const nameChars = profile.name.split('').map((char, i) => (
    <span
      key={i}
      className="title-char inline-block"
      style={{ opacity: 0 }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const mapsUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(profile.location);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <ScrollReveal delay={0.2}>
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Welcome to my Portfolio Site
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mx-auto mt-8 h-28 w-28 overflow-hidden rounded-full border-4 border-primary/20 sm:h-32 sm:w-32 md:h-40 md:w-40">
            {profile.photo && (
              <Image
                src={profile.photo}
                alt={profile.name}
                width={160}
                height={160}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
        </ScrollReveal>

        <h1
          ref={titleRef}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m{' '}
          <span className="text-primary">{nameChars}</span>
        </h1>

        <ScrollReveal delay={0.6}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            {profile.tagline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <a
                href="#works"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 active:scale-95"
              >
                View My Works
                <ChevronDown size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary active:scale-95"
              >
                Get In Touch
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Circle size={8} className="fill-green-500 text-green-500" />
              {profile.availability}
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <MapPin size={14} />
              {profile.location}
            </a>
          </div>
        </ScrollReveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
