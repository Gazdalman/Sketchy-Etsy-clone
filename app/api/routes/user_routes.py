from flask import Blueprint, request
from flask_login import login_required, current_user,logout_user
from app.models import db, User
from app.forms import EditAccountForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__, url_prefix="/users")


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    print(users)
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/', methods=["DELETE"])
@login_required
def delAccount():
    user = User.query.filter(User.id == current_user.get_id()).first()
    logout_user()
    db.session.delete(user)
    db.session.commit()
    return { "message": "delete successful" }

@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def editAccount(id):
    """ edit account details """
    user = User.query.get(id)
    form = EditAccountForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        user.firstName = data["firstName"]
        user.lastName = data["lastName"]
        user.email = data["email"]
        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
