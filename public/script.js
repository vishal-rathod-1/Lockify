document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const strengthMeterFill = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');
    const criteriaItems = document.querySelectorAll('.criteria-item');
    const eyeIcon = document.getElementById('eyeIcon');

    const strengthColors = {
        'Very Weak': 'var(--red)',
        'Weak': 'var(--orange)',
        'Moderate': 'var(--yellow)',
        'Strong': 'var(--blue)',
        'Very Strong': 'var(--green)'
    };

    async function checkPassword(password) {
        try {
            const response = await fetch('/api/check-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });
            
            const data = await response.json();
            
            // Update strength meter
            strengthMeterFill.style.width = `${data.strengthPercentage}%`;
            strengthMeterFill.style.backgroundColor = strengthColors[data.strengthLevel];
            
            // Update criteria icons
            criteriaItems.forEach(item => {
                const criterion = item.dataset.criterion;
                const icon = item.querySelector('.criteria-icon');
                const met = data.criteria[criterion];
                
                icon.textContent = met ? '✓' : '✗';
                icon.style.color = met ? 'var(--green)' : 'var(--red)';
            });
            
            // Update strength text
            strengthText.textContent = `Password Strength: ${data.strengthLevel}`;
            strengthText.style.color = strengthColors[data.strengthLevel];
        } catch (error) {
            console.error('Error checking password:', error);
        }
    }

    passwordInput.addEventListener('input', (e) => {
        checkPassword(e.target.value);
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Update eye icon
        if (type === 'password') {
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        } else {
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        }
    });

    // Initial check with empty password
    checkPassword('');
});