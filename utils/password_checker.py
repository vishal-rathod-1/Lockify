import re

def check_password_strength(password):
    criteria = {
        'has_min_length': len(password) >= 8,
        'has_uppercase': bool(re.search(r'[A-Z]', password)),
        'has_lowercase': bool(re.search(r'[a-z]', password)),
        'has_number': bool(re.search(r'\d', password)),
        'has_special_char': bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password))
    }
    
    met_criteria = sum(criteria.values())
    total_criteria = len(criteria)
    strength_percentage = (met_criteria / total_criteria) * 100
    
    return {
        'criteria': criteria,
        'strength_percentage': strength_percentage,
        'strength_level': get_strength_level(strength_percentage)
    }

def get_strength_level(percentage):
    if percentage <= 20:
        return {'level': 'Very Weak', 'color': 'red'}
    elif percentage <= 40:
        return {'level': 'Weak', 'color': 'orange'}
    elif percentage <= 60:
        return {'level': 'Moderate', 'color': 'yellow'}
    elif percentage <= 80:
        return {'level': 'Strong', 'color': 'blue'}
    else:
        return {'level': 'Very Strong', 'color': 'green'}