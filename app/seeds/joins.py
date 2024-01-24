from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

def undo_cart_p():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_products"))

    db.session.commit()

def undo_wd():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlist_details RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlist_details"))

    db.session.commit()

def undo_op():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_products"))

    db.session.commit()
