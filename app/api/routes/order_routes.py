from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, Order, OrderProduct
from ...forms import CheckoutForm
from .auth_routes import validation_errors_to_error_messages

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

@order_routes.route('/place', methods=["POST", "PUT"])
@login_required
def place_order():
  """
  Place a new order
  """
  if request.method == "POST":
    # user_cart = Cart.query.filter(Cart.user_id == current_user.get_id()).first()
    # cart_items = CartProduct.query.filter(CartProduct.cart_id == user_cart.id).all()

    order = Order(
        user_id = current_user.get_id()
    )

    db.session.add(order)
    db.session.commit()
    return { "Order": order.id }

  if request.method == "PUT":
    #
    form = CheckoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        data = form.data
        orderId = int(data['orderId'])
        order = Order.query.get(orderId)
        if not order:
            return {'errors': [{"Order": "Order not found"}]}, 404
        orderTotal = data['orderTotal']
        itemId = int(data['itemId'])
        quantity = int(data['quantity'])

        prod = Product.query.get(itemId)
        # print(prod)
        product = prod.to_dict()
        units_available = int(product['units_available'])

        errors = {}
        if not prod:
            errors['Not_Found'] = f"Item #{itemId} not found"
            return errors, 404

        if units_available < quantity:
          errors['Low_Availability'] = f"Item #{itemId} only has {product.units_available} in stock"
          return errors, 400

        if units_available < 1:
          errors['Sold_Out'] = f"Item #{itemId} is sold out"
          return errors, 400

        newOrderItem = OrderProduct(
            product_id = itemId,
            order_id = orderId,
            quantity = quantity
        )
        product['units_available'] = units_available - quantity
        # print(order.total)
        order.total = orderTotal
        db.session.add(newOrderItem)
        db.session.commit()
        # print(order.total)
        return {"message": "sucessful"}

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}
    return None
    # for item in cart_items:


    #   product = Product.query.get(item.product_id) # Query for the product based on the cart item ids

    #   # Check whether product has enough units available to be added to order
    #   if product.units_available < 1:
    #     errors[f'{product.name}'] = f'Order could not be placed! "{product.name} only has {product.units_available} units in stock!"'

    #   # Check if product has already been added to the order by querying the joins table ordered by quantity
    #   link = OrderProduct.query.filter(OrderProduct.product_id == item.product_id, OrderProduct.order_id == order.id).order_by(OrderProduct.quantity).first()

    #   # If so, increase the quantity
    #   if link:
    #     link.quantity = link.quantity + 1

    #   # Add the product to the order (regardless of if it has been added already) Might change
    #   order.products.append(product)

    #   # Decrease the available units of the product
    #   product.units_available = product.units_available - 1

    #   # Remove product from cart
    #   user_cart.cart_product_list.remove(product)


    #   # Commit the session to save unit decrease
    #   db.session.commit()

    # # If an error was added, return the errors dictionary
    # if len(errors['errors']):
    #   db.session.delete(order)
    #   db.session.commit()
    #   return errors, 401

    # # Convert the order to a dictionary
    # order_dict = order.to_dict()
    # for item in cart_items:
    #   db.session.delete(item)
    #   db.session.commit()
    # return order_dict
