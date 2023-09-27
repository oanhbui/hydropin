from http import HTTPStatus
from flask import Blueprint, jsonify, make_response, request, session
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
    return {'error': 'Invalid email or password'}, HTTPStatus.UNAUTHORIZED


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

@auth.route('/session')
def get_current_session():
    if session.get('user'):
        return {'user': session['user']}
    else:
        return {'user': None}
    
@auth.route('/logout')
def logout_user():
    session.clear()
    return {'user': None}