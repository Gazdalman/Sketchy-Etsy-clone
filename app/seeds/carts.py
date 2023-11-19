from app.models import db, Cart, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    # ! does not actually seed ??? - needs fixing
    nina_cart = Cart(user_id=1)
    ann_cart = Cart(user_id=2)
    rod_cart = Cart(user_id=3)
    toney_cart = Cart(user_id=4)

    products = Product.query.all()
    print(products)

    nina_cart.cart_product_list.extend([products[0], products[2], products[3]])
    ann_cart.cart_product_list.extend([products[1], products[2], products[2]])
    rod_cart.cart_product_list.extend([products[4], products[2], products[3]])
    toney_cart.cart_product_list.extend([products[1], products[0], products[2]])


    carts = [nina_cart, ann_cart, rod_cart, toney_cart]
    _ = [db.session.add(cart) for cart in carts]
    print(nina_cart)
    print(carts)

    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
