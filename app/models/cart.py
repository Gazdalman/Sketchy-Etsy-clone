from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)

    cart_user = db.relationship(
        "User",
        back_populates="cart"
    )

    cart_product_list = db.relationship(
        "Product",
        secondary="cart_products",
        back_populates="cart"
    )

    def to_dict(self): # ?
        return {
            'user': self.user_id,
            'cart': self.cart_product_list
        }