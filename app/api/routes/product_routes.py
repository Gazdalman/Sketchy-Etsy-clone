from flask import Blueprint, render_template
from flask_login import login_required
from app.models import Product, Review

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def get_all():
  products = Product.query.all()
  p_list = [product.to_dict() for product in products]
  return p_list
  # return render_template("test_products.html", p_list=p_list)

@product_routes.route('/<int:id>')
def specific_product(id):
    """Query to see specific product"""
    product = Product.query.get(id)
    reviews = product.reviews
    seller = product.seller
    p_dict = product.to_dict()

    # p_dict["reviews"] = [review.to_dict() for review in reviews]
    # p_dict["seller"] = seller.to_dict()['username']
    return p_dict

@product_routes.route("/new")
def create_prod():
  pass
