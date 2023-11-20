from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
  __tablename__ = "product_images"

  id = db.Column(db.INTEGER, primary_key=True)
  product_id = db.Column(db.INTEGER, db.ForeignKey('products.id', ondelete='CASCADE'))
  url = db.Column(db.String(2000), nullable=False)

  product = db.relationship(
    "Product",
    back_populates="images"
  )