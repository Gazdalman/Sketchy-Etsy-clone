# from app.models import db, Review, environment, SCHEMA
# from sqlalchemy.sql import text


def seed_reviews():
    seed_review1 = Review(user_id=1, product_id=1, review="A must have in every household")
    seed_review2 = Review(user_id=2, product_id=2, review="Cheap product but i guess you get what you pay for")
    seed_review3 = Review(user_id=3, product_id=2, review="Best product I've ever hard")
    seed_review4 = Review(user_id=2, product_id=3, review="It works")
    seed_review5 = Review(user_id=4, product_id=4, review="Barely works")

#     all_revs = [seed_review1, seed_review2, seed_review3, seed_review4, seed_review5]
#     add_revs = [db.session.add(rev) for rev in all_revs]
#     db.session.commit()

# def undo_reviews():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM users"))

#     db.session.commit()
