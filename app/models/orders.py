from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# order_products = db.Table(
#   "order_products",
#   db.Column("order_id", db.INTEGER, db.ForeignKey("orders.id")),
#   db.Column("product_id", db.INTEGER, db.ForeignKey("products.id"))
# )

class Order(db.Model):
  __tablename__ = "orders"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  
  user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  
  products = db.relationship(
    "Product",
    secondary="order_products",
    back_populates="orders"
  )
