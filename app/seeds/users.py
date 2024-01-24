from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    nina = User(firstName="admin", lastName="user", username="nina", email="demoUser1@testing.io", password="password")

    ann = User(firstName="admin", lastName="user", username="ann", email="demoUser2@testing.io", password="password")

    rod = User(firstName="admin", lastName="user", username="rod", email="demoUser3@testing.io", password="password")

    toney = User(firstName="admin", lastName="user", username="toney", email="demoUser4@testing.io", password="password")

    seed_user5 = User(firstName="demo", lastName="user", username="demoUser5", email="demoUser5@testing.io", password="password")

    all_users = [nina, ann, rod, toney, seed_user5]
    add_users = [db.session.add(user) for user in all_users]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
