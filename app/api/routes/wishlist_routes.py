from flask import Blueprint, render_template, redirect, request
from app.models import db, Wishlist, Product, WishlistDetail
from flask_login import current_user, login_required

wishlist_routes = Blueprint("wishlist", __name__)


#all wishlist
@wishlist_routes.route("/")
@login_required
def all_wishlist():

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).first()

    return wishlist.to_dict()


#add wishlist
@wishlist_routes.route("/add-wish", methods=["POST"])
@login_required
def new_wishlist():

    #get product from the request
    req_product = request.get_json()
    product = Product.query.get(req_product["product"])

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).first()

    #add product to wishlist table
    wishlist.products.append(product)
    db.session.commit()

    return wishlist.to_dict()


#remove wishlist
@wishlist_routes.route("/delete-wish/<int:id>", methods=["DELETE"])
@login_required
def delete_wishlist(id):

    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).first()
    product = Product.query.get(id)

    if product:
        wishlist.products.remove(product)
        db.session.commit()

        return { "message": "Successfully deleted" }
    else:
        return { "error": "Product is not found"}

    # return wishlist.to_dict()
