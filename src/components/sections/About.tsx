'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Check, Camera } from 'lucide-react';
import { profile } from '@/data/profile';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextReveal } from '@/components/animations/TextReveal';

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: num,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  }, [value]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-3xl font-bold text-primary md:text-4xl">
        {value}
      </span>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

const features = [
  'Passionate about creating clean, user-friendly interfaces',
  'More Experienced in frontend development',
  'Strong background in UI/UX design principles',
  'Agile methodologies and Scrum',
];

export function About() {
  return (
    <section id="about" className="section-padding bg-surface">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
                  <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
                  {profile.photo && (
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <span className="section-label">About Me</span>
            <TextReveal as="h2" className="section-title">
              Crafting Digital Experiences
            </TextReveal>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>{profile.bio}</p>
              <p>{profile.bio2}</p>
              <p>{profile.bio3}</p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-background p-6">
              {profile.stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={14} />
                    </span>
                    {feature}
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
