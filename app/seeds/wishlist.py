from app.models import db, Wishlist, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlist():
    wishlist_user1 = Wishlist(user_id=1)
    wishlist_user2 = Wishlist(user_id=2)
    wishlist_user3 = Wishlist(user_id=3)
    wishlist_user4 = Wishlist(user_id=4)
    wishlist_user5 = Wishlist(user_id=5)

    products = Product.query.all()

    wishlist_user1.wishproducts.extend([products[0], products[2], products[3]])
    wishlist_user2.wishproducts.extend([products[1], products[2], products[3]])
    wishlist_user3.wishproducts.extend([products[4], products[2], products[3]])
    wishlist_user4.wishproducts.extend([products[1], products[0], products[2]])
    wishlist_user5.wishproducts.extend([products[0], products[4], products[3]])

    all_wishlists = [wishlist_user1, wishlist_user2, wishlist_user3, wishlist_user4, wishlist_user5]
    _ = [db.session.add(wishlist) for wishlist in all_wishlists]
    db.session.commit()

def undo_wishlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))

    db.session.commit()
