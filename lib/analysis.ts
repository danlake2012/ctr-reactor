import { AdData, AnalysisResults, Metrics, Grade } from '@/types';

export function analyzeAd(adData: AdData): AnalysisResults {
  const metrics = calculateMetrics(adData);
  const contentScore = analyzeContent(adData.headline, adData.description);
  const grade = calculateGrade(metrics, contentScore);
  const recommendations = generateRecommendations(metrics, contentScore, adData);

  return {
    grade,
    metrics,
    recommendations,
    adData
  };
}

function calculateMetrics(adData: AdData): Metrics {
  const { impressions, clicks, conversions, cost } = adData;

  const ctr = (clicks / impressions) * 100;
  const cvr = clicks > 0 ? (conversions / clicks) * 100 : 0;
  const cpc = cost / clicks;
  const cpa = conversions > 0 ? cost / conversions : 0;

  return { ctr, cvr, cpc, cpa };
}

function analyzeContent(headline: string, description: string): number {
  let score = 0;

  // Headline analysis (max 35 points)
  const headlineLength = headline.length;
  if (headlineLength >= 30 && headlineLength <= 60) {
    score += 20;
  } else if (headlineLength >= 20 && headlineLength <= 70) {
    score += 12;
  } else {
    score += 5;
  }

  // Power words check
  const powerWords = /\b(free|new|proven|guaranteed|exclusive|limited|save|discover|amazing|powerful|instant|ultimate|secret)\b/i;
  if (powerWords.test(headline)) {
    score += 8;
  }

  // Numbers in headline
  if (/\d+/.test(headline)) {
    score += 7;
  }

  // Description analysis (max 15 points)
  const descLength = description.length;
  if (descLength >= 100 && descLength <= 200) {
    score += 10;
  } else if (descLength >= 60 && descLength <= 250) {
    score += 6;
  } else {
    score += 3;
  }

  // Call-to-action
  const ctaWords = /\b(click|buy|shop|learn|discover|get|try|start|join|subscribe|download|register|sign up|order|visit)\b/i;
  if (ctaWords.test(description)) {
    score += 5;
  }

  return Math.min(score, 50);
}

function calculateGrade(metrics: Metrics, contentScore: number): Grade {
  let performanceScore = 0;

  // CTR scoring (max 25 points)
  if (metrics.ctr >= 5) {
    performanceScore += 25;
  } else if (metrics.ctr >= 3) {
    performanceScore += 18;
  } else if (metrics.ctr >= 2) {
    performanceScore += 12;
  } else if (metrics.ctr >= 1) {
    performanceScore += 6;
  } else {
    performanceScore += 2;
  }

  // CVR scoring (max 15 points)
  if (metrics.cvr >= 10) {
    performanceScore += 15;
  } else if (metrics.cvr >= 5) {
    performanceScore += 11;
  } else if (metrics.cvr >= 2) {
    performanceScore += 7;
  } else if (metrics.cvr >= 1) {
    performanceScore += 3;
  }

  // CPC scoring (max 5 points) - lower is better
  if (metrics.cpc <= 0.50) {
    performanceScore += 5;
  } else if (metrics.cpc <= 1.00) {
    performanceScore += 4;
  } else if (metrics.cpc <= 2.00) {
    performanceScore += 3;
  } else if (metrics.cpc <= 5.00) {
    performanceScore += 1;
  }

  // CPA scoring (max 5 points) - lower is better
  if (metrics.cpa > 0) {
    if (metrics.cpa <= 10) {
      performanceScore += 5;
    } else if (metrics.cpa <= 25) {
      performanceScore += 3;
    } else if (metrics.cpa <= 50) {
      performanceScore += 1;
    }
  }

  const totalScore = performanceScore + contentScore;
  const letter = getGradeLetter(totalScore);

  return { score: totalScore, letter };
}

function getGradeLetter(score: number): string {
  if (score >= 95) return 'S+';
  if (score >= 90) return 'S';
  if (score >= 85) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 75) return 'A-';
  if (score >= 70) return 'B+';
  if (score >= 65) return 'B';
  if (score >= 60) return 'B-';
  if (score >= 55) return 'C+';
  if (score >= 50) return 'C';
  if (score >= 45) return 'C-';
  if (score >= 40) return 'D+';
  if (score >= 35) return 'D';
  return 'F';
}

function generateRecommendations(
  metrics: Metrics,
  contentScore: number,
  adData: AdData
): string[] {
  const recommendations: string[] = [];

  // CTR recommendations
  if (metrics.ctr < 1) {
    recommendations.push('CRITICAL: CTR below 1%. Headline needs immediate optimization for better click appeal.');
  } else if (metrics.ctr < 2) {
    recommendations.push('CTR requires improvement. Test more compelling headlines with power words.');
  } else if (metrics.ctr >= 5) {
    recommendations.push('EXCELLENT: CTR above 5%. Your ad is highly engaging.');
  }

  // CVR recommendations
  if (metrics.cvr < 1) {
    recommendations.push('ALERT: CVR below 1%. Landing page experience needs optimization.');
  } else if (metrics.cvr < 2) {
    recommendations.push('CVR is low. Ensure ad messaging aligns with landing page content.');
  } else if (metrics.cvr >= 10) {
    recommendations.push('OUTSTANDING: CVR above 10%. Excellent ad-to-landing page alignment.');
  }

  // CPC recommendations
  if (metrics.cpc > 5) {
    recommendations.push('WARNING: High CPC detected. Improve Quality Score or refine targeting.');
  } else if (metrics.cpc > 2) {
    recommendations.push('CPC is elevated. Consider long-tail keywords or audience refinement.');
  } else if (metrics.cpc <= 0.50) {
    recommendations.push('OPTIMAL: CPC is excellent. Maintain current targeting strategy.');
  }

  // CPA recommendations
  if (metrics.cpa > 50) {
    recommendations.push('CRITICAL: High CPA. Optimize conversion funnel and ad relevance.');
  } else if (metrics.cpa > 25) {
    recommendations.push('CPA needs improvement. Focus on higher-intent traffic.');
  } else if (metrics.cpa > 0 && metrics.cpa <= 10) {
    recommendations.push('EXCELLENT: CPA is highly efficient. Scale this campaign.');
  }

  // Content recommendations
  if (adData.headline.length < 30) {
    recommendations.push('Headline is too short. Expand to 30-60 characters for better performance.');
  } else if (adData.headline.length > 70) {
    recommendations.push('Headline may be too long. Consider condensing to 30-60 characters.');
  }

  if (!/\d+/.test(adData.headline)) {
    recommendations.push('Add specific numbers to headline (e.g., "Save 50%", "Top 10 Tips").');
  }

  if (adData.description.length < 100) {
    recommendations.push('Description is brief. Add more detail about benefits and unique value.');
  }

  if (!/\b(click|buy|shop|learn|discover|get|try|start|join|subscribe|download)\b/i.test(adData.description)) {
    recommendations.push('Add a strong call-to-action to description (e.g., "Get Started", "Shop Now").');
  }

  // Overall recommendations
  if (contentScore >= 45) {
    recommendations.push('STRONG: Ad copy quality is excellent. Continue A/B testing variations.');
  }

  if (recommendations.length === 0) {
    recommendations.push('OPTIMAL PERFORMANCE: All metrics within excellent ranges.');
    recommendations.push('Continue monitoring and test minor variations for incremental gains.');
  }

  return recommendations;
}
