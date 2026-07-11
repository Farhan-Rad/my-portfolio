import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { GithubIcon } from '@/lib/icons';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="pt-16">
      <div className="relative aspect-[2/1] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        {project.status === 'in-progress' && (
          <span className="absolute right-4 top-20 rounded-full bg-amber-500/90 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            In Progress
          </span>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/#works"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{project.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 bg-surface-elevated px-3 py-1.5 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
            >
              <GithubIcon width={18} height={18} />
              View Source Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
