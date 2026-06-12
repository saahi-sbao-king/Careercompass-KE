
export type IntelligenceType = 
  | 'Linguistic'
  | 'Logical-Mathematical'
  | 'Spatial'
  | 'Bodily-Kinesthetic'
  | 'Musical'
  | 'Interpersonal'
  | 'Intrapersonal'
  | 'Naturalist'
  | 'Existential';

export interface Question {
  id: number;
  text: string;
  type: IntelligenceType;
}

export interface IntelligenceResult {
  type: IntelligenceType;
  score: number;
  percentage: number;
}

export type CBEPathway = 'STEM' | 'Arts & Sports' | 'Social Sciences';

export interface CareerInfo {
  title: string;
  description: string;
  avgSalary: string;
  demandScore: number; // 1-10
  skills: string[];
}

export interface UserAssessment {
  scores: Record<IntelligenceType, number>;
  dominant: IntelligenceType;
  coDominant: IntelligenceType;
  pathway: CBEPathway;
  recommendedSubjects: string[];
  suggestedCareers: CareerInfo[];
}
