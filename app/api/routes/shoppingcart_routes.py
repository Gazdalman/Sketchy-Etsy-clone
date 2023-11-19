from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Cart, User, CartProduct

shoppingcart_routes = Blueprint('cart', __name__, url_prefix="/cart")

@shoppingcart_routes.route("/")
def shoppingCart():
    """Query for user's shopping cart"""
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    # * toggle line 14 in and out of comment if it ever stops working -.- typically the line that fucks shit up lol
    itemList = []
    for item in cartDict["cart"]:
        item = item.to_dict()
        item["quantity"] = 0
        product = CartProduct.query.filter(CartProduct.product_id == item["id"] and CartProduct.cart_id == cart["id"]).all()
        # ! this if statement may change due to quantity updates being send to PUT method route below from front end
        if item["quantity"] < 1:
            item["quantity"] = 1
        else:
            item["quantity"] = item["quantity"] + 1
        itemList.append(item)
    return itemList


@shoppingcart_routes.route("/<int:id>", methods=["DELETE"])
def delItem(id):
    """ delete item from cart """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    product = CartProduct.query.filter(CartProduct.product_id == id and CartProduct.cart_id == cart["id"]).first()
    if product:
        cart["cart_product_list"].remove(product)
        db.session.commit()
        return { "message": "delete successful" }
    else:
        return { "error": "Product doesn't exist in your cart..." }


@shoppingcart_routes.route("/<int:id>", methods=["PUT"])
def updateQunatity(id):
    """ update item quantity """
    quant = request.get_json()
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    product = CartProduct.query.filter(CartProduct.product_id == id and CartProduct.cart_id == cart["id"]).first()
    if quant == "inc":
        product["quantity"] = product["quantity"] + 1
        db.session.commit()
        return { "message": "success" }
    elif quant == "dec":
        product["quantity"] = product["quantity"] - 1
        db.session.commit()
        return { "message": "success" }
    else:
        return { "error": "How did you even do this o.O ???" }
