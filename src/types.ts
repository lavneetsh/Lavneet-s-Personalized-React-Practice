export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface DetailedExplanation {
  what: string;
  why: string;
  problemSolved: string;
  useCases: string[];
  benefits: string[];
  drawbacks: string[];
  whenToUse: string;
  whenNotToUse: string;
}

export interface Mistakes {
  freshers: string;
  midLevel: string;
  nextjs?: string;
}

export interface RealProjectExample {
  name: 'Damora AI' | 'CareMagnus';
  description: string;
  detail: string;
}

export interface FollowUpQuestions {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
}

export interface Question {
  id: number;
  title: string;
  chapterId: number;
  chapterTitle: string;
  difficulty: Difficulty;
  answer30s: string;
  explanation: DetailedExplanation;
  mentalModel: {
    analogy: string;
    description: string;
  };
  code: string;
  files?: { name: string; language?: string; code: string }[];
  walkthrough: string[];
  diagram?: string; // ASCII or inline SVG template
  followups: FollowUpQuestions;
  tricky: string[];
  mistakes: Mistakes;
  realProject: RealProjectExample;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  questionIds: number[];
}

export interface UserProgress {
  bookmarks: number[]; // Question IDs
  completed: number[]; // Question IDs
  customNotes: Record<number, string>; // Question ID -> Note
}
