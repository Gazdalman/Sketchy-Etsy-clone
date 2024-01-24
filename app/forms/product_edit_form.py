from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class ProductEditForm(FlaskForm):
  name = StringField("Product Name", validators=[DataRequired(), Length(3,50)])
  price = FloatField("Price $", validators=[DataRequired()])
  description = TextAreaField("Description", validators=[DataRequired(), Length(10, 2000)])
  units_available = IntegerField("# Available")
  category = StringField("Category", validators=[DataRequired()])
