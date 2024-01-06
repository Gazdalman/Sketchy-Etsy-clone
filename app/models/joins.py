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

<<<<<<< HEAD
  id = db.Column(db.INTEGER, primary_key=True)
  cart_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("carts.id")))

  product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("products.id")))
=======
#   id = db.Column(db.INTEGER, primary_key=True)

#   orderId = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("carts.id")))

#   product_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("products.id")))

#   quantity = db.Column(db.INTEGER, nullable=False, default=1)
>>>>>>> 77bb327b3a34b0d3beba541edeb30df513e17a38




  def to_dict(self):
    return {
      "orderId": self.cart_id,
      "productId": self.product_id,
      "quatity": self.quantity
    }
