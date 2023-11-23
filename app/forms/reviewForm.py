from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.api.routes.aws_helper import ALLOWED_EXTENSIONS


class ReviewForm(FlaskForm):
    product_id = IntegerField("ProductId")
    user_id = IntegerField("UserId")
    review = TextAreaField("Review", [DataRequired()])
    rating = IntegerField("Rating", [DataRequired()])
    preview = FileField("Image file", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")
