from flask import Blueprint
from flask_login import login_required
from app.models import Product, Review

product_routes = Blueprint('products', __name__, url_prefix="/products")


@product_routes.route('/')
def products():
    """Query to see all products"""


@product_routes.route('/<int:id>')
def specific_product():
    """Query to see specific product"""
    product = Product.query.get(id)
    return product.to_dict()
