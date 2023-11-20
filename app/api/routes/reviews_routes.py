from flask import Blueprint, request
from flask_login import login_required
from app.models import Product, Review, db
from app.forms import ReviewForm

review_routes = Blueprint("reviews", __name__, url_prefix='/reviews')

@review_routes.route("/<int:id>")
# @login_required
def get_all(id):
  """
  Returns a list of all reviews
  """
  reviews = Review.query.filter(Review.user_id == id).all()
  review_list = {'reviews': [review.to_dict() for review in reviews]}
  return review_list
