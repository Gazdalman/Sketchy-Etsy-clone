from app.models import db, Product, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    seed_order1 = Order(user_id=1)
    seed_order2 = Order(user_id=2)
    seed_order3 = Order(user_id=3)
    seed_order4 = Order(user_id=3)
    seed_order5 = Order(user_id=4)

    products = Product.query.all()

    seed_order1.products.extend([products[1], products[3]])
    seed_order2.products.extend([products[2], products[3]])
    seed_order3.products.extend([products[1], products[2]])
    seed_order4.products.extend([products[3], products[3]])
    seed_order5.products.extend([products[0], products[4]])

    all_orders = [seed_order1, seed_order2, seed_order3, seed_order4, seed_order5]
    add_orders = [db.session.add(order) for order in all_orders]
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
