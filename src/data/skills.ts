import { SkillCategory } from '@/types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: '6',
    name: 'Frontend Developer',
    icon: 'code',
    color: 'primary',
    skills: [
      { id: '6-1', name: 'HTML' },
      { id: '6-2', name: 'CSS' },
      { id: '6-3', name: 'JavaScript' },
      { id: '6-4', name: 'TypeScript' },
      { id: '6-5', name: 'React' },
      { id: '6-6', name: 'Tailwind CSS' },
    ],
  },
  {
    id: '7',
    name: 'Backend Developer',
    icon: 'code',
    color: 'primary',
    skills: [
      { id: '7-1', name: 'PHP' },
      { id: '7-2', name: 'Laravel' },
    ],
  },
  {
    id: '3',
    name: 'Graphic Design',
    icon: 'design',
    color: 'info',
    skills: [
      { id: '3-1', name: 'School Posters' },
      { id: '3-2', name: 'Event Posters' },
      { id: '3-3', name: 'Movie Posters' },
      { id: '3-4', name: 'Environmental Posters' },
    ],
  },
  {
    id: '4',
    name: 'Camera',
    icon: 'camera',
    color: 'accent',
    skills: [
      { id: '4-1', name: 'Photography' },
      { id: '4-2', name: 'Videography' },
    ],
  },
  {
    id: '8',
    name: 'Editing',
    icon: 'editing',
    color: 'secondary',
    skills: [
      { id: '8-1', name: 'Video Editing' },
      { id: '8-2', name: 'Image Editing' },
    ],
  },
];
