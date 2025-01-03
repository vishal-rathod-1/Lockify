export const getStrengthColor = (percentage: number): string => {
  if (percentage <= 20) return 'bg-red-500';
  if (percentage <= 40) return 'bg-orange-500';
  if (percentage <= 60) return 'bg-yellow-500';
  if (percentage <= 80) return 'bg-blue-500';
  return 'bg-green-500';
};

export const getStrengthText = (percentage: number): string => {
  if (percentage <= 20) return 'Very Weak';
  if (percentage <= 40) return 'Weak';
  if (percentage <= 60) return 'Moderate';
  if (percentage <= 80) return 'Strong';
  return 'Very Strong';
};