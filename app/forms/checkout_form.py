from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class CheckoutForm(FlaskForm):
    # * card information inputs -> options in front end for demo card info
    name_on_card = StringField("Card Owner", [DataRequired()])
    card_number = StringField("Card Number", [DataRequired()])
    security_code = StringField("CVV", [DataRequired()])
    expiration = StringField("Expiration Date", [DataRequired()])

    submit = SubmitField("Submit")
