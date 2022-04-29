from flask import Flask, send_from_directory

def create_app(test_config=None):
    app = Flask(__name__,instance_relative_config=True, static_url_path='', static_folder='frontend/build')

    @app.route('/')
    def root():
        return send_from_directory(app.static_folder,'index.html')

    return app