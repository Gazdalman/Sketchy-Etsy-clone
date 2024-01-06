from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderProduct(db.Model):
  __tablename__ = "order_products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  order_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("orders.id")))
  product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("products.id")))

  quantity = db.Column(db.INTEGER, default=1)


# class CartProduct(db.Model):
#   __tablename__ = "cart_products"

#   if environment == "production":
#     __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  cart_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("carts.id")))

  product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("products.id")))




  def to_dict(self):
    return {
      "orderId": self.cart_id,
      "orderId": self.cart_id,
      "productId": self.product_id,
      "quatity": self.quantity
    }
