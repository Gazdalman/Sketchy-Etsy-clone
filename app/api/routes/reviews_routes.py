from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms import ProductForm

review_routes = Blueprint("/reviews", __name__)

@review_routes.route("/<int:productId>")
def get_all_product_reviews(productId):
  """
  Returns a list of all product reviews
  """
  reviews = Review.query.filter(Review.product_id == productId).all()
  review_list = {'reviews': [review.to_dict() for review in reviews]}
  return review_list

@review_routes.route("/<int:id>")
@login_required
def get_all_user_reviews(id):
  """
  Returns a list of all user reviews
  """
  reviews = Review.query.filter(Review.user_id == id).all()
  review_list = {'reviews': [review.to_dict() for review in reviews]}
  return review_list
