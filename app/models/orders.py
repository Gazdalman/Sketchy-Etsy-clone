from .db import db
from datetime import datetime

order_products = db.Table(
  "order_products",
  db.Column("order_id", db.INTEGER, db.ForeignKey("orders.id")),
  db.Column("product_id", db.INTEGER, db.ForeignKey("products.id"))
)

class Order(db.Model):
  __tablename__ = "orders"

  id = db.Column(db.INTEGER, primary_key=True)
  user_id = db.Column(db.INTEGER, db.ForeignKey("users.id"), nullable=False)
  products = db.relationship(
    "Product",
    secondary="order_products",
    back_populates="orders"
  )
