from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    seed_review1 = Review(user_id=1, product_id=1,rating=3, review="A must have in every household")
    seed_review2 = Review(user_id=2, product_id=2,rating=5, review="Cheap product but i guess you get what you pay for")
    seed_review3 = Review(user_id=3, product_id=2,rating=4, review="Best product I've ever hard")
    seed_review4 = Review(user_id=2, product_id=3,rating=5, review="It works")
    seed_review5 = Review(user_id=4, product_id=4,rating=2, review="Barely works")
    seed_review6 = Review(user_id=2, product_id=1,rating=3, review="A must have in every household")
    seed_review7 = Review(user_id=2, product_id=4,rating=5, review="Cheap product but i guess you get what you pay for")
    seed_review8 = Review(user_id=4, product_id=2,rating=4, review="Best product I've ever hard")
    seed_review9 = Review(user_id=5, product_id=3,rating=5, review="It works")
    seed_review10 = Review(user_id=4, product_id=3,rating=2, review="Barely works")
    seed_review11 = Review(user_id=2, product_id=5,rating=3, review="A must have in every household")
    seed_review12 = Review(user_id=3, product_id=1,rating=5, review="Cheap product but i guess you get what you pay for")
    seed_review13 = Review(user_id=3, product_id=3,rating=4, review="Best product I've ever hard")
    seed_review14 = Review(user_id=4, product_id=1,rating=5, review="It works")
    seed_review15 = Review(user_id=5, product_id=4,rating=2, review="Barely works")

    all_revs = [seed_review1, seed_review2, seed_review3, seed_review4, seed_review5, seed_review6, seed_review7, seed_review8, seed_review9, seed_review10, seed_review11, seed_review12, seed_review13, seed_review14, seed_review15]
    add_revs = [db.session.add(rev) for rev in all_revs]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

#     db.session.commit()
