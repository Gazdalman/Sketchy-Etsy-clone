from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, Review, db, User, ProductImage
from app.forms import ProductForm, ProductImageForm, ProductEditForm
from .aws_helper import get_unique_filename, upload_file_to_s3, remove_file_from_s3

product_routes = Blueprint("products", __name__, url_prefix="/products")

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
  products = Product.query.filter(Product.seller_id > 0).all()
  p_list = [product.to_dict() for product in products]
  return p_list
  # return render_template("test_products.html", p_list=p_list)

@product_routes.route("/user/<int:id>")
def user_products(id):
  """
  Gets the products sold by a user
  """
  products = Product.query.filter((id) == Product.seller_id).all()

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
  """
  Creating a product
  """
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    prev_img = data['preview']
    prev_img.filename = get_unique_filename(prev_img.filename)
    upload = upload_file_to_s3(prev_img)

    if 'url' not in upload:
      return upload

    product = Product(
      name=data['name'],
      price=data['price'],
      description=data['description'],
      category=data['category'],
      units_available=data['units_available'],
      seller_id=current_user.get_id(),
      preview_image=upload["url"],
    )
    db.session.add(product)

    db.session.commit()
    return product.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
  """
  Removes or edits all information on an item
  """

  user = User.query.get(current_user.get_id())
  product = Product.query.get(id)

  if product:
      user.products.remove(product)
      product.seller_id = 0
      _=[remove_file_from_s3(image.url) for image in product.images]
      product.description = 'N/A'
      product.units_available = 0
      db.session.commit()
      print("done")
      return {"message": f"Successfully deleted Product {product.id} - {product.name}"}

  return {"errors": ["not_found : No product with that id found"]}, 401

@product_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_product(id):
  """
  Updates product
  """
  product = Product.query.get(id)
  form = ProductEditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data=form.data
    product = Product.query.get(id)
    if product and int(current_user.get_id()) == int(product.seller_id):
      product.name=data['name']
      product.price=data['price']
      product.description=data['description']
      product.units_available=data['units_available']
      product.category=data['category']
    elif current_user.get_id() != product.seller_id:
      return {"errors": ["unauthorized : You do not own this product."]}, 401
    else:
      return {"errors": ["not_found : Product not found."]}, 401

    db.session.commit()
    return product.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/images/<int:id>", methods=["DELETE"])
def remove_images(id):
  """
  Deletes a selected image
  """
  image = ProductImage.query.get(id)

  remove_file_from_s3(image.url)
  db.session.delete(image)
  db.session.commit()

@product_routes.route("/<int:id>/images", methods=["POST"])
@login_required
def add_images(id):
  form = ProductImageForm()
  product = Product.query.get(int(id))
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print("made it into image validation")
    data = form.data
    img = data['image']
    img.filename = get_unique_filename(img.filename)
    upload = upload_file_to_s3(img)

    if 'url' not in upload:
      return upload
    image = ProductImage(
      url=upload['url'],
      product_id=int(id)
    )
    product.images.append(image)
    db.session.add(image)
    db.session.commit()
    return image.to_dict()

  print(form.errors)
  return {"errors": ["not_found : No product with that id found"]}, 401
