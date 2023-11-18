from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
  __tablename__ = "products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  seller_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
  description = db.Column(db.String(2000), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
  updated_at = db.Column(db.DATETIME, default=datetime.utcnow, onupdate=datetime.utcnow)



  # wishlist = db.relationship(
  #   "Wishlist",
  #   secondary="wishlist_details",
  #   back_populates="products"
  # )

  reviews = db.relationship(
    "Review",
    back_populate="product"
  )

  orders = db.relationship(
    "Order",
    secondary="order_products",
    back_populates="products"
  )

  @property
  def categories(self):
    return self.categories

  @categories.setter
  def categories(self, *args):
    self.categories = list(*args)

  def __repr__(self):
    return f'<Order {self.id}>'

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'seller_id': self.seller_id,
      'price': self.price,
      'description': self.description,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
