from app import app
from app.models import db, User

# copied over to users.py for seed all functionality

with app.app_context():
    db.drop_all()
    db.create_all()

    nina = User(firstName="admin", lastName="user", username="nina", email="demoUser1@testing.io", password="password")

    ann = User(firstName="admin", lastName="user", username="ann", email="demoUser2@testing.io", password="password")

    rod = User(firstName="admin", lastName="user", username="rod", email="demoUser3@testing.io", password="password")

    toney = User(firstName="admin", lastName="user", username="toney", email="demoUser4@testing.io", password="password")

    seed_user5 = User(firstName="demo", lastName="user", username="demoUser5", email="demoUser5@testing.io", password="password")

    all_users = [nina, ann, rod, toney, seed_user5]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()
