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
    firstName = StringField("First Name")

    lastName = StringField("Last Name")

    email = StringField('email', validators=[email_exists])
    #, Email()

    # old_password = StringField('current password', validators=[DataRequired()])

    # new_password = StringField('new password')
