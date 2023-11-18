from flask import Blueprint, render_template, redirect, request
from app.models import db, Wishlist, Product
from flask_login import current_user, login_required

bp = Blueprint("wishlist", __name__)


#all wishlist
@bp.route("/")
@login_required
def all_wishlist():

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).all()[0]

    return wishlist.to_dict()


# #add wishlist
@bp.route("/add-wish", methods=["POST"])
@login_required
def new_wishlist():

    #get product from the request
    req_product = request.get_json()
    product = Product.query.get(req_product["product"])

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).all()[0]

    #add product to wishlist table
    wishlist.products.append(product)
    db.session.commit()

    return wishlist.to_dict()


#remove wishlist
@bp.route("/delete-wish", methods=["DELETE"])
@login_required
def delete_wishlist():
    req_product = request.get_json()
    product = Product.query.get(req_product["product"])

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).all()[0]

    wishlist.products.remove(product)

    db.session.commit()

    return wishlist.to_dict()
