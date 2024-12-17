import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthIndicator } from './components/StrengthIndicator';
import { checkPasswordStrength, calculateStrengthPercentage } from './utils/passwordStrength';

function App() {
  const [password, setPassword] = useState('');
  const criteria = checkPasswordStrength(password);
  const strengthPercentage = calculateStrengthPercentage(criteria);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Password Strength Checker
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create a strong password to keep your account secure
        </p>

        <div className="space-y-6">
          <PasswordInput
            value={password}
            onChange={setPassword}
          />

          <StrengthIndicator
            criteria={criteria}
            strengthPercentage={strengthPercentage}
          />

          <div className="text-center text-gray-600 text-sm">
            {strengthPercentage === 100 ? (
              <span className="text-green-500 font-semibold">
                Great! Your password meets all security requirements
              </span>
            ) : (
              <span>
                Password strength: {Math.round(strengthPercentage)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;