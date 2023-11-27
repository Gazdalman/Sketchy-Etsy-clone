from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product, Order, Cart, CartProduct,  OrderProduct

order_routes = Blueprint("orders", __name__, url_prefix="/orders")

@order_routes.route('/')
@login_required
def get_orders():
  """
  Get all user orders
  """
  orders = Order.query.filter(Order.user_id == current_user.get_id()).all()
  return dict([(order.id, order.to_dict()) for order in orders])

@order_routes.route("/<int:id>")
@login_required
def get_one(id):
  """
  Get a specific order the user has placed
  """
  order = Order.query.get(id)
  if order:
    return order.to_dict()
  return {"errors": f"Order #{id} not found"}, 401

@order_routes.route('/place', methods=["POST"])
@login_required
def place_order():
  """
  Place a new order
  """
  user_cart = Cart.query.filter(Cart.user_id == current_user.get_id()).first()
  cart_items = CartProduct.query.filter(CartProduct.cart_id == user_cart.id).all()

  order = Order(
    user_id=current_user.get_id()
  )

  db.session.add(order)
  db.session.commit()

  errors = {}

  for item in cart_items:


    product = Product.query.get(item.product_id) # Query for the product based on the cart item ids

    # Check whether product has enough units available to be added to order
    if product.units_available < 1:
      errors[f'{product.name}'] = f'Order could not be placed! "{product.name} only has {product.units_available} units in stock!"'

    # Check if product has already been added to the order by querying the joins table ordered by quantity
    link = OrderProduct.query.filter(OrderProduct.product_id == item.product_id, OrderProduct.order_id == order.id).order_by(OrderProduct.quantity).first()

    # If so, increase the quantity
    if link:
      link.quantity = link.quantity + 1

    # Add the product to the order (regardless of if it has been added already) Might change
    order.products.append(product)

    # Decrease the available units of the product
    product.units_available = product.units_available - 1

    # Remove product from cart
    user_cart.cart_product_list.remove(product)


    # Commit the session to save unit decrease
    db.session.commit()

  # If an error was added, return the errors dictionary
  if len(errors['errors']):
    db.session.delete(order)
    db.session.commit()
    return errors, 401

  # Convert the order to a dictionary
  order_dict = order.to_dict()
  for item in cart_items:
    db.session.delete(item)
    db.session.commit()
  return order_dict
