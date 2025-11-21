export interface AdData {
  headline: string;
  description: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface Metrics {
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
}

export interface Grade {
  score: number;
  letter: string;
}

export interface AnalysisResults {
  grade: Grade;
  metrics: Metrics;
  recommendations: string[];
  adData: AdData;
}
