from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Product, Order, Cart, db, OrderProduct

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

  # if not len(user_cart.cart_product_list):
  #   return {"errors": "Cannot place orders with empty cart"}

  # order = Order(
  #   user_id=current_user.get_id()
  # )
  # db.session.add(order)

  # for product in user_cart.cart_product_list:
  #   item_ordered = OrderProduct.query.filter(
  #       OrderProduct.order_id == order.id,
  #       OrderProduct.product_id == product.id
  #   ).first()
  #   # print("order?", item_ordered)
  #   if item_ordered.product_id == product.id:
  #     print("This is the order", item_ordered._quantity)
  #     item_ordered.quantity = item_ordered.quantity + 1
  #   else:
  #     order.products.append(product)

    # db.session.commit()
  return user_cart.to_dict()
