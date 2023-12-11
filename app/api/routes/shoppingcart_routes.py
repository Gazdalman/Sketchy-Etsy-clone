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


@shoppingcart_routes.route("/<int:id>", methods=["POST"])
def addItem(id):
    """ add item to cart """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    product = Product.query.get(int(id))
    if product.units_available < 1:
        return {"errors": f"Product is sold out"}, 401
    product.units_available = product.units_available - 1
    prodDict = product.to_dict()
    prodDict['quantity'] = 1
    print(prodDict)
    cart.cart_product_list.extend([prodDict])
    db.session.commit()

    return { "message": "success" }


@shoppingcart_routes.route("/product/<int:id>", methods=["DELETE"])
def delItem(id):
    """ delete item from cart """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    product = Product.query.get(id)

    products = CartProduct.query.filter(CartProduct.product_id == id, CartProduct.cart_id == cart.id).all()
    if product and len(products) > 0:
        product.units_available = product.units_available + 1
        for prod in products:
            db.session.delete(prod)
        db.session.commit()
        return { "message": "delete successful" }
    else:
        return { "errors": "Product doesn't exist in your cart..." }, 401


@shoppingcart_routes.route("/<string:change>/<int:itemId>/<int:quantity>", methods=["PUT"])
def updateQuantity(change, itemId, quantity):
    """ update item quantity """
    userId = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == userId).first()
    item = Product.query.get(itemId)
    product = CartProduct.query.filter(CartProduct.product_id == int(itemId), CartProduct.cart_id == cart.id).order_by(CartProduct.quantity.desc()).first()
    if change == "inc":
        product.quantity = product.quantity + 1
        # new_link = CartProduct(
        #     cart_id=cart.id,
        #     product_id=itemId
        # )
        # db.session.add(new_link)

        db.session.commit()
        return { "message": "success" }
    elif change == "dec":
        product.quantity = product.quantity - 1
        db.session.commit()
        if product.quantity <= 0:
            db.session.delete(product)
            db.session.commit()
        # link = CartProduct.query.filter(CartProduct.product_id == int(itemId), CartProduct.cart_id == cart.id).order_by(CartProduct.quantity).first()
        # db.session.delete(link)
        return { "message": "success" }
    else:
        return { "errors": "How did you even do this o.O ???" }, 401
