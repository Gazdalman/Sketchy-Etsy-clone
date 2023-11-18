from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
    # ! does not actually seed ??? - needs fixing
    nina_cart1 = Cart(user_id=1, product_id=1)
    nina_cart2 = Cart(user_id=1, product_id=2)
    nina_cart3 = Cart(user_id=1, product_id=3)
    nina_carts = [nina_cart1, nina_cart2, nina_cart3]
    add_nina_carts = [db.session.add(cart) for cart in nina_carts]

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
