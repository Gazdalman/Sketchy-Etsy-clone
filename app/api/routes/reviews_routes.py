from flask import Blueprint, session, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint("/reviews", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@review_routes.route("/<int:productId>/new", methods=["POST"])
@login_required
def make_new_review(productId):
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  form['rating'] = form.data["rating"]
  form['review'] = form.data["review"]
  seven = list(form)
  print("🐍 File: routes/reviews_routes.py | Line: 33 | make_new_review ~ seven",seven)
  if form.validate_on_submit():
    new_review=Review(
      product_id=form.date["product_id"],
      user_id=form.data["user_id"],
      review=form.data["review"],
      rating=form.data["rating"]
    )
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
