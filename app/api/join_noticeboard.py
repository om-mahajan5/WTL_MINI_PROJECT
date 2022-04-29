from flask import request
from flask_restful import Resource
from ..utils.sqlalchemy_object import db
from app.models import *


def add_member(uid, nbid):
    new_noticeboard = UserNoticeBoard(uid=uid, nbid=nbid)
    db.session.add(new_noticeboard)
    db.session.commit()
    return True


class join_noticeboard_api(Resource):
    def post(self):
        uid = (request.json["uid"],)
        nbid = request.json["nbid"]
        if add_member(uid, nbid):
            return None, 201
        else:
            return None, 500
