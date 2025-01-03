from flask_wtf import FlaskForm
from wtforms import PasswordField
from wtforms.validators import DataRequired

class PasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()], render_kw={"class": "password-field"})
