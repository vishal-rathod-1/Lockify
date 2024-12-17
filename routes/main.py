from flask import Blueprint, render_template, jsonify, request
from forms.password_form import PasswordForm
from utils.password_checker import check_password_strength

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods=['GET'])
def index():
    form = PasswordForm()
    return render_template('index.html', form=form)

@main_bp.route('/check-password', methods=['POST'])
def check_password():
    data = request.get_json()
    password = data.get('password', '')
    
    strength_result = check_password_strength(password)
    return jsonify(strength_result)