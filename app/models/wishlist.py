from .db import db, environment,SCHEMA, add_prefix_for_prod

class WishlistDetail(db.Model):
    __tablename__ = "wishlist_details"

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("wishlists.id")))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))

class Wishlist (db.Model):
    __tablename__ = "wishlists"


    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    products = db.relationship(
       "Product",
       secondary="wishlist_details",
       back_populates="wishlist"
    )

    user = db.relationship(
      "User",
      back_populates="wishlist"
   )

    #secondary states what the join table is

    def to_dict(self):
       return {
          "id": self.id,
          "user_id": self.user_id,
          "products": dict( [(product.id, { "id": product.id, "name": product.name, "price": product.price}) for product in self.products ])
       }
