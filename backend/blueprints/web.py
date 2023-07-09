from flask import Blueprint, render_template

web_pages = Blueprint('web', __name__)

@web_pages.route('/')
def index():
    """ Simple health check """
    return render_template('base.html')