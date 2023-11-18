from flask import Blueprint
from flask_login import current_user
from app.models import Cart, User

shoppingcart_routes = Blueprint('cart', __name__, url_prefix="/cart")

@shoppingcart_routes.route("/<int:id>")
def shoppingCart(id):
    """Query for user's shopping cart"""
    print(id)
    user = User.query.get(current_user.get_id())
    print(user)
    cart = Cart.query.filter(Cart.user_id == current_user.get_id())
    cart_list = [item.to_dict() for item in cart]
    return cart_list
