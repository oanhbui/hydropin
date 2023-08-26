from flask import Blueprint, request, session
from services import auth as auth_service

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["POST"])
def login_api():
    data = request.get_json()
    if not data.get("email"):
        return {'error': 'Email is required!'}, 400
    user_email = data["email"]
    user_password = data["password"]
    verify_user = auth_service.verify_user(user_email, user_password)
    if verify_user is not None:
        session["user"] = verify_user.to_json()
        return {"user": session["user"]}
    return {'error': 'Invalid email or password'}, 403

@auth.route('/logout')
def log_out():
    session.clear()
    return {'success': True}

@auth.route('/signup', methods=["POST"])
def sign_up():
    data = request.get_json()
    for required_field in ['email', 'first_name', 'last_name', 'password']:
        if not data.get(required_field):
            return {'error': f'{required_field} is required!', "field": required_field}
    existing_user = auth_service.get_user_by_email(data["email"])
    if existing_user is not None:
        return {'error': 'Email is already used!', 'field': 'email'}
    new_user = auth_service.create_user(data["first_name"],
                             data["last_name"],
                             data["email"],
                             data["password"])
    session["user"] = new_user.to_json()
    return {"user": session["user"]}
