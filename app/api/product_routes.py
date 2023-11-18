from flask import Blueprint
from flask_login import login_required
from app.models import Product, Review

product_routes = Blueprint("products", __name__)

@product_routes.route('/<int:id>')
def specific_product():
    """Query to see specific product"""
    product = Product.query.get(id)
    return product.to_dict()

@product_routes.route("/")
def get_all():
  products = Product.query.all()
  p_list = [product.to_dict() for product in products]
  return p_list

@product_routes.route("/new")
def create_prod():
  pass

