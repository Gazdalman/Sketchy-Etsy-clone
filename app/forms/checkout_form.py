from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CheckoutForm(FlaskForm):
    orderId = IntegerField('Order Id', [DataRequired()])
    itemId = IntegerField('Product Id', [DataRequired()])
    quantity = IntegerField('Product Quantity', [DataRequired()])
    orderTotal = StringField('Order Total',  [DataRequired()])
