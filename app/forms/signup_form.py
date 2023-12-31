from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User



def email_exists(form, field):
    """Checking if user exists"""
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    """Checking if username is already in use"""
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField("First Name", [DataRequired("First name is required."), Length(min=2, message="First name must be 2 characters or longer.")])

    lastName = StringField("Last Name", validators=[Length(min=2, message="First name must be a minimum of 2 charactors long")])

    username = StringField(
        'username', validators=[DataRequired(), username_exists])

    email = StringField('email', validators=[DataRequired(), email_exists])

    password = StringField('password', validators=[DataRequired()])
