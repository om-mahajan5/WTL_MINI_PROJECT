from flask import request
from flask_restful import Resource
from ..utils.sqlalchemy_object import db
from app.models import UserNoticeBoard


def remove_member_from_noticeboard(uid, nbid):
    UserNoticeBoard.query.filter(
        UserNoticeBoard.uid == uid, UserNoticeBoard.nbid == nbid
    ).delete()
    db.session.commit()
    return True


class leave_noticeboard_api(Resource):
    def post(self):
        uid = request.json["uid"]
        nbid = request.json["nbid"]
        if remove_member_from_noticeboard(uid, nbid):
            return None, 201
        else:
            return None, 500
