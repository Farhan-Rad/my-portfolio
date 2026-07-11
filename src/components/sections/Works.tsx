'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { GithubIcon } from '@/lib/icons';

export function Works() {
  return (
    <section id="works" className="section-padding bg-surface">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center">
            <span className="section-label">My Work</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle mx-auto">{profile.worksSubtitle}</p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}

                  {project.status === 'in-progress' && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      In Progress
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/50 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-full border border-border/50 px-2.5 py-1 text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
                    <Link
                      href={'/projects/' + project.slug}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Eye size={14} />
                      Details
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <GithubIcon size={14} />
                        Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
