from .db import db, environment, SCHEMA, add_prefix_for_prod
from .joins import OrderProduct
from .products import Product
from datetime import datetime


class Order(db.Model):
  __tablename__ = "orders"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)

  user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


  products = db.relationship(
    "Product",
    secondary=add_prefix_for_prod("order_products"),
    back_populates="orders"
  )

  def get_records(self):
    items = self.products
    products = []
    print(items)
    for product in items:
      prod_dict = product.to_dict()
      order_item = OrderProduct.query.filter(OrderProduct.product_id == prod_dict['id'], OrderProduct.order_id == self.id).order_by(OrderProduct.quantity.desc()).first()
      prod_dict['quantity'] = order_item.quantity
      products.append(prod_dict)
    # for item in order_items:
    #   product = Product.query.get(item.product_id)
    #   products.append(product)
    return products

  @property
  def price(self):
    products = self.get_records()
    price = 0
    for product in products:
      price += product['price'] * product['quantity']

    return price


  def to_dict(self):
    return {
      "user_id": self.user_id,
      "products": [{'id': product['id'],'name': product['name'], 'price': product['price'], 'quantity': product['quantity']} for product in self.get_records()],
      "total": f'${self.price}',
      "placed": datetime.utcnow(),
      "fulfilled": datetime.utcnow()
    }
  def product_ids(self):
    return [product.id for product in self.get_records()]
