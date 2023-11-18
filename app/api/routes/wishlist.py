from flask import Blueprint, render_template, redirect, request
from app.models import Wishlist, WishlistDetail
from flask_login import current_user

bp = Blueprint("wishlist", __name__)

@bp.route("/")
def wishlist():

    #update / append
    # wishlist = Wishlist.query.filter(user_id == current_user.get_id()).all()

    #add and get separate routes
    #wishlist.products.append(product_id)


    #get request data
    #request.data['product']
    #return wishlist.products(be)  (fe)confirm message

    return render_template("test_wishlist.html")
