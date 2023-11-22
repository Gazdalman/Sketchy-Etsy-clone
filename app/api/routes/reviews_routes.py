from flask import Blueprint, session, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Review, db, User
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

@review_routes.route("/<int:id>/reviews")
@login_required
def get_all_user_reviews(id):
  print("🐍 File: routes/reviews_routes.py | Line: 30 | undefined ~ id",id)
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

  if form.validate_on_submit():

    new_review=Review(
      product_id=form.data["product_id"],
      user_id=form.data["user_id"],
      review=form.data["review"],
      rating=form.data["rating"]
    )
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_review(id):
  review = Review.query.get(id)
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    if int(current_user.get_id()) == int(review.user_id):
      review.product_id=form.data["product_id"],
      review.user_id=form.data["user_id"],
      review.review=form.data["review"],
      review.rating=form.data["rating"]
    else:
      return "You do not own this product"

  db.session.commit()
  return review.to_dict()

@review_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review(id):
  user = User.query.filter(User.id == current_user.get_id()).first()
  review = Review.query.get(id)

  if review:
    db.session.delete(review)
    db.session.commit()
    return f"Congrats {user.firstName} you successfully DELETED review # {review.id}"

  return "Sorry No Review Was DELETED"
