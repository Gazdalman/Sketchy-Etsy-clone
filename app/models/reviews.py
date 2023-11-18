from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    review = db.Column(db.String, nullable=False)
    seller_commented = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.Date, nullable=False, default = date.today())
    updated_at = db.Column(db.Date, nullable=False, default = date.today())

<<<<<<< HEAD
    product = db.relationship(
    "Product",
    back_populates="reviews"
    )

    def to_dict(self):
        dictionary = {
            "id": self.id,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "review": self.review,
            "seller_commented": self.seller_commented,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

        return dictionary
=======
    products = db.relationship(
        "Product",
        back_populates="reviews"
    )
>>>>>>> f6920ac (cart FE & BE some connects made)
