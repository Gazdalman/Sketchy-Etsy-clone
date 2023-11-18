from .db import db


class Wishlist (db.Model):
    __tablename__ = "wishlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    products = db.relationship("Product", secondary="wishlist_details")
    #secondary states what the join table is

class WishlistDetail(db.Model):
    __tablename__ = "wishlist_details"

    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey("wishlists.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    # wishlist =  db.relationship("Wishlist", back_populate="products" )


#query user/:id.wishlist.product >

#seeds
#wishlist user = // 
