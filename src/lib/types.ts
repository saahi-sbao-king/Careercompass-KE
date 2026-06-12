
export type AssessmentCategory = 
  | 'Technology'
  | 'Medicine & Health'
  | 'Engineering'
  | 'Business'
  | 'Agriculture'
  | 'Education'
  | 'Law'
  | 'Arts & Media';

export type AssessmentSection = 'Passions' | 'Interests' | 'Abilities';

export interface Question {
  id: number;
  text: string;
  section: AssessmentSection;
  subSection?: string;
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
}

export interface UserAssessment {
  rawAnswers: Record<number, number>;
  categoryResults: CategoryResult[];
}
