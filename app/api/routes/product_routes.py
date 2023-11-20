from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms import ProductForm

product_routes = Blueprint("products", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@product_routes.route("/")
def get_all():
  """
  Returns a list of all products on the site
  """
  products = Product.query.all()
  p_list = [product.to_dict() for product in products]
  return p_list
  # return render_template("test_products.html", p_list=p_list)

@product_routes.route("/user/<int:id>")
def user_products(id):
  products = Product.query.filter(id == Product.seller_id).all()

  return dict((product.id, product.to_dict()) for product in products)

@product_routes.route('/<int:id>')
def specific_product(id):
    """Query to see specific product"""
    product = Product.query.get(id)
    p_dict = product.to_dict()

    # p_dict["reviews"] = [review.to_dict() for review in reviews]
    # p_dict["seller"] = seller.to_dict()['username']
    return p_dict

@product_routes.route("/form", methods=["POST"])
@login_required
def create_prod():
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    product = Product(
      name=data['name'],
      price=data['price'],
      description=data['description'],
      units_available=data['units_available'],
      seller_id=current_user.get_id()
    )

    db.session.add(product)

    db.session.commit()
    return product.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
  product = Product.query.get(id)

  if product:
    db.session.delete(product)
    db.session.commit()
    return {"message": f"Successfully deleted Product {product.id} - {product.name}"}

  return "No product with that id found"

@product_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_product(id):
  product = Product.query.get(id)
  form = ProductForm
  if form.validate_on_submit():
    data=form.data
    product = Product.query.get(id)
    if product and int(current_user.get_id()) == int(product.seller_id):
      product.name=data['name']
      product.price=data['price']
      product.description=data['description']
      product.units_available=data['units_available']
    elif current_user.get_id() != product.seller_id:
      return {"errors": "You do not own this product."}
    else:
      return {"errors": "Product not own."}

    db.session.commit()
    return product.to_dict()
