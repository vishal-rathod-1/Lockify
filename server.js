import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory after build
app.use(express.static('dist'));

// API endpoint for password checking
app.post('/api/check-password', (req, res) => {
  const { password } = req.body;
  const result = checkPasswordStrength(password || '');
  res.json(result);
});

// All other routes should serve the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

function checkPasswordStrength(password) {
  const criteria = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const metCriteria = Object.values(criteria).filter(Boolean).length;
  const strengthPercentage = (metCriteria / Object.keys(criteria).length) * 100;

  let strengthLevel = 'Very Weak';
  if (strengthPercentage > 80) strengthLevel = 'Very Strong';
  else if (strengthPercentage > 60) strengthLevel = 'Strong';
  else if (strengthPercentage > 40) strengthLevel = 'Moderate';
  else if (strengthPercentage > 20) strengthLevel = 'Weak';

  return {
    criteria,
    strengthPercentage,
    strengthLevel
  };
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});