from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Product, Order, Cart

order_routes = Blueprint("orders", __name__)

@order_routes.route('/')
@login_required
def get_orders():
  orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
  return [order.to_dict() for order in orders]

