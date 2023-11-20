from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length
from app.api.routes.aws_helper import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
  name = StringField("Product Name", validators=[DataRequired(), Length(3,50)])
  price = FloatField("Price $", validators=[DataRequired()])
  description = TextAreaField("Description", validators=[DataRequired(), Length(10, 2000)])
  units_available = IntegerField("# Available", validators=[DataRequired()])
  # product_id = IntegerField()
  # image_1 = FileField("Image file", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
