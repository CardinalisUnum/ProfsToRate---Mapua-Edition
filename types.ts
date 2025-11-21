export enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
  Drop = 'Drop'
}

export interface Review {
  id: string;
  courseCode: string;
  semester: string;
  year: number;
  gradeReceived: Grade;
  qualityRating: number; // 1-5
  difficultyRating: number; // 1-5
  wouldTakeAgain: boolean;
  tags: string[];
  comment: string;
  helpfulCount: number;
  createdAt: string;
  author?: string;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  university: string;
  avatarUrl: string;
  reviews: Review[];
  // Computed stats are usually handled on the fly or cached, 
  // but we will compute them on the client for this SPA
}

export interface ProfStats {
  avgQuality: number;
  avgDifficulty: number;
  percentTakeAgain: number;
  totalReviews: number;
  gradeDistribution: { name: string; count: number }[];
  topTags: { tag: string; count: number; type: 'positive' | 'negative' | 'neutral' }[];
}