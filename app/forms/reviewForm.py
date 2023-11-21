from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    review = TextAreaField("Review", [DataRequired()])
    rating = IntegerField("Rating", [DataRequired()])
    submit = SubmitField("Submit")
