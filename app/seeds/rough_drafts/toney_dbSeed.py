from app import app
from app.models import db, Product

with app.app_context():
    db.drop_all()
    db.create_all()

    seed_product1 = Product(name="demoProduct", seller_id=1, price=1, description="This is a product")
    seed_product2 = Product(name="demoProduct", seller_id=1, price=1, description="This is a product")
    seed_product3 = Product(name="demoProduct", seller_id=2, price=1, description="This is a product")
    seed_product4 = Product(name="demoProduct", seller_id=3, price=1, description="This is a product")
    seed_product5 = Product(name="demoProduct", seller_id=4, price=1, description="This is a product")

    # db.session.add(seed_product1)
    # db.session.add(seed_product2)
    # db.session.add(seed_product3)
    # db.session.add(seed_product4)
    # db.session.add(seed_product5)
    # db.session.commit()
    all_products = [seed_product1, seed_product2, seed_product3, seed_product4, seed_product5]
    add_products = [db.session.add(product) for product in all_products]
    db.session.commit()
