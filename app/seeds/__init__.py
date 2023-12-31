from flask.cli import AppGroup
from app.models.db import db, environment, SCHEMA

""" Import Seed Files """
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .products import seed_products, undo_products
from .wishlist import seed_wishlist, undo_wishlist
from .orders import seed_orders, undo_orders
# from .rough_drafts.carts import seed_carts, undo_carts
from .joins import undo_op, undo_wd

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo command, which will  truncate all tables prefixed with the schema name (see comment in users.py undo_users function). Make sure to add all your other model's undo functions below
        # ? - decide order after test
        undo_wd()
        # undo_cart_p()
        undo_op()
        # undo_carts()
        undo_reviews()
        undo_wishlist()
        undo_orders()
        undo_products()
        undo_users()

    seed_users()
    seed_products()
    seed_orders()
    seed_wishlist()
    seed_reviews()
    # seed_carts()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # ? - decide order after test
    undo_wd()
    # undo_cart_p()
    undo_op()
    # undo_carts()
    # undo_wishlist()
    undo_orders()
    undo_products()
    undo_reviews()
    undo_users()
    # Add other undo functions here
