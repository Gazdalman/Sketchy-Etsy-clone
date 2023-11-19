from flask import Blueprint
from flask_login import current_user
from app.models import Cart, User

shoppingcart_routes = Blueprint('cart', __name__, url_prefix="/cart")

@shoppingcart_routes.route("/<int:id>")
def shoppingCart(id):
    """Query for user's shopping cart"""
    user = User.query.get(current_user.get_id())
    cart = Cart.query.filter(Cart.user_id == current_user.get_id()).all()
    cart_dict = cart[0].to_dict()
    cart_dict["products"] = [product.to_dict() for product in cart_dict["products"]]
    print(cart_dict)
    return cart_dict
