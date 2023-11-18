# from app import app
# from app.models import db, Review


# with app.app_context():
#     db.drop_all()
#     db.create_all()

#     seed_review1 = Review(user_id=1, review="A must have in every household")
#     seed_review2 = Review(user_id=2, review="Cheap product but i guess you get what you pay for")
#     seed_review3 = Review(user_id=3, review="Best product I've ever hard")
#     seed_review4 = Review(user_id=2, review="It works")
#     seed_review5 = Review(user_id=4, review="Barely works")

#     # db.session.add(seed_review1)
#     # db.session.add(seed_review2)
#     # db.session.add(seed_review3)
#     # db.session.add(seed_review4)
#     # db.session.add(seed_review5)
#     # db.session.commit()

#     all_revs = [seed_review1, seed_review2, seed_review3, seed_review4, seed_review5]
#     add_revs = [db.session.add(rev) for rev in all_revs]
#     db.session.commit()
