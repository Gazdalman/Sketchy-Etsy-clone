# from .db import db

# # class PastOrder(db.Model):
# #     __tablename__="past_orders"

# #     id = db.Column(db.Integer, primary_key=True)
# #     date_purchase = db.Column(db.Date) #date created
# #     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
# #     product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

#     #not database dont need a table
#     #order is the pastorder themselves backend
#     #backend route to collect all the purchased product (created_at before anyorder that they have placed)
#     #allow them to purchase again
      # use order_id
