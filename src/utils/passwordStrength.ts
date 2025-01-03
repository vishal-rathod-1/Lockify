interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export const checkPasswordStrength = (password: string): PasswordCriteria => {
  return {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const calculateStrengthPercentage = (criteria: PasswordCriteria): number => {
  const totalCriteria = Object.values(criteria).length;
  const metCriteria = Object.values(criteria).filter(Boolean).length;
  return (metCriteria / totalCriteria) * 100;
};