import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface StrengthIndicatorProps {
  criteria: {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  strengthPercentage: number;
}

export function StrengthIndicator({ criteria, strengthPercentage }: StrengthIndicatorProps) {
  const getStrengthColor = () => {
    if (strengthPercentage <= 20) return 'bg-red-500';
    if (strengthPercentage <= 40) return 'bg-orange-500';
    if (strengthPercentage <= 60) return 'bg-yellow-500';
    if (strengthPercentage <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const criteriaList = [
    { key: 'hasMinLength', label: 'At least 8 characters' },
    { key: 'hasUpperCase', label: 'Contains uppercase letter' },
    { key: 'hasLowerCase', label: 'Contains lowercase letter' },
    { key: 'hasNumber', label: 'Contains number' },
    { key: 'hasSpecialChar', label: 'Contains special character' },
  ];

  return (
    <div className="space-y-4">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {criteriaList.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            {criteria[key as keyof typeof criteria] ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}