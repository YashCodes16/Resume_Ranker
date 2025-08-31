from flask import Flask
import logging
from logging.handlers import RotatingFileHandler
import os

def create_app():
    app = Flask(__name__)
    if not os.path.exists('logs'):
        os.makedirs('logs')

    file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=3)
    file_handler.setLevel(logging.INFO)

    formatter = logging.Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
    file_handler.setFormatter(formatter)

    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    
    from .routes import analyze_bp
    app.register_blueprint(analyze_bp)

    return app