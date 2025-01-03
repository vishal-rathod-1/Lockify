document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const strengthMeterFill = document.querySelector('.strength-meter-fill');
    const criteriaItems = document.querySelectorAll('.criteria-item');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', async function() {
        const response = await fetch('/check-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: this.value })
        });
        
        const data = await response.json();
        
        // Update strength meter
        strengthMeterFill.style.width = `${data.strength_percentage}%`;
        strengthMeterFill.style.backgroundColor = `var(--${data.strength_level.color})`;
        
        // Update criteria icons
        Object.entries(data.criteria).forEach(([key, met], index) => {
            const icon = criteriaItems[index].querySelector('.criteria-icon');
            icon.innerHTML = met ? '✓' : '✗';
            icon.style.color = met ? 'var(--green)' : 'var(--red)';
        });
        
        // Update strength text
        strengthText.textContent = `Password Strength: ${data.strength_level.level}`;
        strengthText.style.color = `var(--${data.strength_level.color})`;
    });
});