export function getGradeColor(score: number): string {
  if (score >= 90) return '#00ff41'; // Bright green
  if (score >= 80) return '#39ff14'; // Electric green
  if (score >= 70) return '#7fff00'; // Chartreuse
  if (score >= 60) return '#ffff00'; // Yellow
  if (score >= 50) return '#ffa500'; // Orange
  return '#ff4500'; // Red-orange
}
