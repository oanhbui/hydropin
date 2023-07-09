import os
from flask import Flask
from blueprints.health import health_page
from blueprints.web import web_pages
from blueprints.api import api

app = Flask(__name__)
app.config.from_object(os.environ.get('CONFIG_MODULES', 'config.DefaultConfig'))

app.register_blueprint(web_pages)
app.register_blueprint(health_page, url_prefix='/health')
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(host=app.config.get('HOST'), port=app.config.get('PORT'))