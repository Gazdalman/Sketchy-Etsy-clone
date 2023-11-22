from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
  __tablename__ = "products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  seller_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='SET NULL'))
  price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
  description = db.Column(db.String(2000), nullable=False)
  category = db.Column(db.String(20000))
  units_available = db.Column(db.INTEGER, nullable=False)
  preview_image = db.Column(db.String(2000))
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


  seller = db.relationship(
    "User",
    back_populates="products"
  )

  wishlist = db.relationship(
    "Wishlist",
    secondary="wishlist_details",
    back_populates="products"
  )

  reviews = db.relationship(
    "Review",
    back_populates="product"
  )

  orders = db.relationship(
    "Order",
    secondary="order_products",
    back_populates="products"
  )

  cart = db.relationship(
    "Cart",
    secondary="cart_products",
    back_populates="cart_product_list"
  )

  images = db.relationship(
    "ProductImage",
    back_populates="product"
  )

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'seller_id': self.seller_id,
      'category': self.category,
      'price': self.price,
      'description': self.description,
      'units_available': self.units_available,
      'created_at': self.created_at,
      "seller": self.seller.to_dict()['username'] if self.seller else 'deleted',
      "reviews": [review.to_dict() for review in self.reviews],
      "preview": self.preview_image,
      "images": [image.to_dict() for image in self.images]
    }
