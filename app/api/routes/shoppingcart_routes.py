from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Cart, User, CartProduct, Product

shoppingcart_routes = Blueprint('cart', __name__, url_prefix="/cart")

@shoppingcart_routes.route("/")
def shoppingCart():
    """Query for user's shopping cart"""
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    # * toggle line 14 in and out of comment if it ever stops working -.- typically the line that fucks shit up lol
    itemList = {}
    for item in cartDict["cart"]:
        item = item.to_dict()
        product = CartProduct.query.filter(CartProduct.product_id == item["id"], CartProduct.cart_id == cart.id).first()
        item["quantity"] = int(product.quantity)
        itemList[item["id"]] = item
    return { "cart": itemList }


@shoppingcart_routes.route("/product/<int:id>", methods=["DELETE"])
def delItem(id):
    """ delete item from cart """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    cartDict = cart.to_dict()
    product = Product.query.get(id)
    if product:
        print(cart.cart_product_list)
        cart.cart_product_list.remove(product)
        db.session.commit()
        return { "message": "delete successful" }
    else:
        return { "error": "Product doesn't exist in your cart..." }


@shoppingcart_routes.route("/<string:change>/<int:itemId>", methods=["PUT"])
def updateQunatity(change, itemId):
    """ update item quantity """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    product = CartProduct.query.filter(CartProduct.product_id == itemId, CartProduct.cart_id == cart.id).first()
    if change == "inc":
        product.quantity = product.quantity + 1
        db.session.commit()
        return { "message": "success", "new quantity": product.quantity }
    elif change == "dec":
        product.quantity = product.quantity - 1
        db.session.commit()
        return { "message": "success", "new quantity": product.quantity }
    else:
        return { "error": "How did you even do this o.O ???" }
