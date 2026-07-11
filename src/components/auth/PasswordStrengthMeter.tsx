import React from 'react';

type PasswordStrength = 'Weak' | 'Medium' | 'Strong';

const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return 'Weak';

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score >= 3) return 'Strong';
  if (score >= 2) return 'Medium';
  return 'Weak';
};

export const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const strength = getPasswordStrength(password);
  const width = password ? (strength === 'Weak' ? '33%' : strength === 'Medium' ? '66%' : '100%') : '0%';

  const colorMap: Record<PasswordStrength, string> = {
    Weak: 'bg-red-500',
    Medium: 'bg-amber-500',
    Strong: 'bg-green-500',
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between text-xs font-medium">
        <span className="text-gray-600">Password strength</span>
        <span className={strength === 'Weak' ? 'text-red-600' : strength === 'Medium' ? 'text-amber-600' : 'text-green-600'}>{strength}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className={`h-2 rounded-full transition-all ${colorMap[strength]}`} style={{ width }} />
      </div>
    </div>
  );
};
