from .db import db, environment,SCHEMA, add_prefix_for_prod


class Wishlist (db.Model):
    __tablename__ = "wishlists"


    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    #wishlist.product.append(product_id)

    products = db.relationship(
       "Product",
       secondary="wishlist_details",
       back_populates="wishlist"
    )

    #secondary states what the join table is

    def to_dict(self):
       return {
          "id": self.id,
          "user_id": self.user_id,
          "products": dict([ (product.id, {"name": product.name, "price": product.price}) for product in self.products ])
       }


class WishlistDetail(db.Model):
    __tablename__ = "wishlist_details"

    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey("wishlists.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    # wishlist =  db.relationship("Wishlist", back_populate="products" )
