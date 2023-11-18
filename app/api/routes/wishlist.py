from flask import Blueprint, render_template, redirect, request
from app.models import Wishlist, Product
from flask_login import current_user, login_required

bp = Blueprint("wishlist", __name__)


#all wishlist
@bp.route("/")
@login_required
def all_wishlist():
    wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).all()
    print('all-wishlist======>', wishlist)
    print('to_dict=======>',wishlist[0].to_dict())
    return wishlist[0].to_dict()


# #add wishlist
# @bp.route("")
# def new_wishlist():

#     #update / append
#     wishlist = Wishlist.query.filter(Wishlist.user_id == current_user.get_id()).all()

#     #product = product.query.get(product_id)
#     #wishlist.products.append(product)
#     #get request data
#     #request.data['product']
#     #return wishlist.products(be)  (fe)confirm message

#     #get product from the request
#     # req_product = request.data["product"]
#     print('======>', request.data)
#     # product = Product.query.get(req_product.id)
#     #add product to wishlist table
#     # wishlist.products.append(product)

#     return wishlist[0].to_dict()
