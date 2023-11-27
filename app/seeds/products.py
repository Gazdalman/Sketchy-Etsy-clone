from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    seed_product1 = Product(name="demoProduct1", seller_id=1, preview_image="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price=1, description="This is a product", units_available=1000)
    seed_product2 = Product(name="demoProduct2", seller_id=1, preview_image="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price=1, description="This is a product", units_available=1000)
    seed_product3 = Product(name="demoProduct3", seller_id=2, preview_image="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price=1, description="This is a product", units_available=1000)
    seed_product4 = Product(name="demoProduct4", seller_id=3, preview_image="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price=1, description="This is a product", units_available=1000)
    seed_product5 = Product(name="demoProduct5", seller_id=4, preview_image="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", price=1, description="This is a product", units_available=1000)

    all_products = [seed_product1, seed_product2, seed_product3, seed_product4, seed_product5]
    add_products = [db.session.add(product) for product in all_products]
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
