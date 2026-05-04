export interface Project {
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
  heroImage?: string;
  problem: string;
  approach: string;
  techStack: string[];
  screenshots?: string[];
  whatILearned: string;
  demoUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'placeholder-project-one',
    title: '[PROJECT TITLE]',
    summary: '[ONE-LINE SUMMARY: what this project does and why it matters.]',
    featured: true,
    problem:
      '[PROBLEM: Describe the specific problem or gap this project addresses. What was broken, missing, or dangerous? Who was affected?]',
    approach:
      '[APPROACH: Walk through how you solved it — architecture decisions, tools chosen, trade-offs considered, and how you iterated.]',
    techStack: ['Python', 'Docker', 'Wireshark', 'Linux'],
    whatILearned:
      '[WHAT I LEARNED: Reflect on what you gained — technical depth, new mental models, what you would do differently next time.]',
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    slug: 'placeholder-project-two',
    title: '[PROJECT TITLE]',
    summary: '[ONE-LINE SUMMARY: what this project does and why it matters.]',
    featured: false,
    problem: '[PROBLEM: Describe the specific problem this project addresses.]',
    approach: '[APPROACH: Describe your solution and key decisions.]',
    techStack: ['Go', 'TCP/IP', 'Nmap'],
    whatILearned: '[WHAT I LEARNED: Key takeaways from this project.]',
    demoUrl: undefined,
    repoUrl: undefined,
  },
  {
    slug: 'placeholder-project-three',
    title: '[PROJECT TITLE]',
    summary: '[ONE-LINE SUMMARY: what this project does and why it matters.]',
    featured: false,
    problem: '[PROBLEM: Describe the specific problem this project addresses.]',
    approach: '[APPROACH: Describe your solution and key decisions.]',
    techStack: ['Rust', 'Bash', 'SIEM'],
    whatILearned: '[WHAT I LEARNED: Key takeaways from this project.]',
    demoUrl: undefined,
    repoUrl: undefined,
  },
];
