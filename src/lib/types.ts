
export type AssessmentType = 'PIA' | 'MI';

export type AssessmentCategory = 
  | 'Technology'
  | 'Medicine & Health'
  | 'Engineering'
  | 'Business'
  | 'Agriculture'
  | 'Education'
  | 'Law'
  | 'Arts & Media'
  | 'Linguistic'
  | 'Logical-Mathematical'
  | 'Spatial'
  | 'Musical'
  | 'Bodily-Kinesthetic'
  | 'Interpersonal'
  | 'Intrapersonal'
  | 'Naturalistic'
  | 'Existential';

export type AssessmentSection = 'Passions' | 'Interests' | 'Abilities' | 'MI';

export interface Question {
  id: number;
  text: string;
  section: AssessmentSection;
  subSection?: string;
  type: AssessmentType;
}

export interface CategoryResult {
  category: AssessmentCategory;
  score: number;
  maxScore: number;
  percentage: number;
  matchLevel: string;
}

export type CBEPathway = 'STEM' | 'Arts & Sports' | 'Social Sciences';

export interface CareerInfo {
  title: string;
  description: string;
  avgSalary: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  skills: string[];
  subjects: string[];
  universities: string[];
  tvetOptions: string[];
  whyFit: string;
}

export interface QuizResults {
  type: AssessmentType;
  answers: Record<number, number>;
  timestamp: number;
}
