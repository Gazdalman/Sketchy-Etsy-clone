from app import app
from app.models import db, Wishlist, WishlistDetail

with app.app_context():
    db.drop_all()
    db.create_all()

    wishlist_user1 = Wishlist(user_id=1)

    wishlist_user2 = Wishlist(user_id=2)

    wishlist_user3 = Wishlist(user_id=3)

    wishlist_user4 = Wishlist(user_id=4)

    wishlist_user5 = Wishlist(user_id=5)


#wishlist_user# [product1, product2, product3...]
all_wishlists = [wishlist_user1, wishlist_user2, wishlist_user3, wishlist_user4, wishlist_user5]
_ = [db.session.add(wishlist) for wishlist in all_wishlists]
db.session.commit()

#user will have wishlist property
