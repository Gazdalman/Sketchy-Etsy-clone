from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Product, Order, Cart, db

order_routes = Blueprint("orders", __name__)

@order_routes.route('/')
@login_required
def get_orders():
  orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
  return [order.to_dict() for order in orders]

@order_routes.route('/place', methods=["POST"])
@login_required
def place_order():
  user_cart = Cart.query.filter(Cart.user_id == current_user.get_id()).first()

  if not len(user_cart.products):
    return {"errors": "Cannot place orders with empty cart"}

  order = Order(
    user_id=current_user.get_id()
  )

  order.products.extend(user_cart.products)
  db.session.add(order)
  db.session.commit()

  return order.to_dict()
