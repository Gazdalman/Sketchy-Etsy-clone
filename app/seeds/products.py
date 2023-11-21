from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    seed_product1 = Product(name="demoProduct1", seller_id=1, price=1, description="This is a product", units_available=1000)
    seed_product2 = Product(name="demoProduct2", seller_id=1, price=1, description="This is a product", units_available=1000)
    seed_product3 = Product(name="demoProduct3", seller_id=2, price=1, description="This is a product", units_available=1000)
    seed_product4 = Product(name="demoProduct4", seller_id=3, price=1, description="This is a product", units_available=1000)
    seed_product5 = Product(name="demoProduct5", seller_id=4, price=1, description="This is a product", units_available=1000)

    all_products = [seed_product1, seed_product2, seed_product3, seed_product4, seed_product5]
    add_products = [db.session.add(product) for product in all_products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
