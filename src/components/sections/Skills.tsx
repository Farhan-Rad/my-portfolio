'use client';
import { Code2, Palette, Camera, Users, Edit3 } from 'lucide-react';
import { skillCategories } from '@/data/skills';
import { profile } from '@/data/profile';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import type { FC } from 'react';
import type { SkillCategory as SkillCategoryType } from '@/types/portfolio';

const iconMap: Record<SkillCategoryType['icon'], FC<{ size?: number }>> = {
  code: Code2 as FC<{ size?: number }>,
  design: Palette as FC<{ size?: number }>,
  camera: Camera as FC<{ size?: number }>,
  users: Users as FC<{ size?: number }>,
  editing: Edit3 as FC<{ size?: number }>,
};

const colorMap: Record<SkillCategoryType['color'], string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  info: 'bg-[#8000d9]/10 text-[#8000d9]',
};

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center">
            <span className="section-label">What I Do</span>
            <h2 className="section-title">Skills &amp; Expertise</h2>
            <p className="section-subtitle mx-auto">{profile.skillsSubtitle}</p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon];
            const colorClass = colorMap[category.color];
            return (
              <ScrollReveal key={category.id} delay={i * 0.15}>
                <div className="group rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className={'rounded-xl p-3 ' + colorClass}>
                      {Icon && <Icon size={24} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.skills.length} Skills
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-border/50 bg-surface-elevated px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
