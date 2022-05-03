from flask import Flask, send_from_directory

from app.api.get_notices import get_notice_list
from .utils.sqlalchemy_object import db, ma
from flask_restful import Api
from .utils.database_url import url
from .api import *


def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_url_path="",
        static_folder="frontend/build",
    )
    api = Api(app)
    ma.init_app(app)
    if test_config == None:
        app.config.from_mapping(
            ENV="development",
            SECRET_KEY="dev",
            SQLALCHEMY_DATABASE_URI=url,
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
        )
    else:
        app.config.from_mapping(test_config)
    api.add_resource(create_notice,"/api/create-notice")
    api.add_resource(get_notice_list, "/api/get-notices")
    api.add_resource(get_user_details, "/api/user")
    api.add_resource(create_noticeboard, "/api/create-noticeboard")
    api.add_resource(join_noticeboard_api, "/api/join-noticeboard")
    api.add_resource(leave_noticeboard_api,"/api/leave-noticeboard")
    api.add_resource(delete_notice,"/api/delete-notice")

    @app.errorhandler(404)
    def error(e):
        return 'send_from_directory(app.static_folder, "index.html"),404'

    @app.route("/")
    def root():
        return send_from_directory(app.static_folder, "index.html")

    db.init_app(app)
    app.app_context().push()
    # db.create_all()
    return app
