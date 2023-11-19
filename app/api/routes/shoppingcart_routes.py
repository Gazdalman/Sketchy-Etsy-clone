from flask import Blueprint
from flask_login import current_user
from app.models import Cart, User

shoppingcart_routes = Blueprint('cart', __name__, url_prefix="/cart")

@shoppingcart_routes.route("/")
def shoppingCart():
    """Query for user's shopping cart"""
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    print("Cart ==> ", cartDict["cart"])
    return cartDict["cart"]
