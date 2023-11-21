from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product, Order, Cart, CartProduct,  OrderProduct

order_routes = Blueprint("orders", __name__)

@order_routes.route('/')
@login_required
def get_orders():
  """
  Get all user orders
  """
  orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
  return dict([(order.id, order.to_dict()) for order in orders])

@order_routes.route('/place', methods=["POST"])
@login_required
def place_order():
  """
  Place a new order
  """
  user_cart = Cart.query.filter(Cart.user_id == current_user.get_id()).first()
  cart_items = CartProduct.query.filter(CartProduct.cart_id == user_cart.id).all()
  # if not len(user_cart.cart_product_list):
  #   return {"errors": "Cannot place orders with empty cart"}

  order = Order(
    user_id=current_user.get_id()
  )

  # order.products.extend(user_cart.cart_product_list.all())

  for item in cart_items:
    product = Product.query.get(item.product_id)
    order.products.append(product)
    product.units_available = product.units_available - 1

  order_dict = order.to_dict()
  db.session.add(order)
  db.session.commit()

  return order_dict
