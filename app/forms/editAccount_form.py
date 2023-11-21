from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User

def email_exists(form, field):
    """Checking if user exists"""
    email = field.data
    user = User.query.filter(User.email == email, User.id != current_user.get_id()).first()
    if user:
        raise ValidationError('Email address is already in use.')


class EditAccountForm(FlaskForm):
    firstName = StringField("First Name", validators=[DataRequired(), Length(min=2, message="First name must be a minimum of 2 charactors long")])

    lastName = StringField("Last Name", validators=[Length(min=2, message="First name must be a minimum of 2 charactors long")])

    email = StringField('email', validators=[DataRequired(), email_exists])
    #, Email()
    # ! may add ability to change user's password
    # old_password = StringField('current password', validators=[DataRequired()])

    # new_password = StringField('new password')
