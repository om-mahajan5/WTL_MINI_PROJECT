from flask import request
from flask_restful import Resource

from app.api.leave_noticeboard import remove_members_from_noticeboard
from ..utils.sqlalchemy_object import db
from app.models import *

def delete_noticeboard(uid, nbid):
    NoticeBoard.query.filter(
        NoticeBoard.uid == uid, NoticeBoard.nbid == nbid
    ).delete()
    db.session.commit()
    remove_members_from_noticeboard(nbid=nbid)
    return True

class delete_noticeoard_api(Resource):
    def post(self):
        uid = request.json["uid"]
        nbid = request.json["nbid"]
        if delete_noticeboard(uid, nbid):
            return None, 201
        else:
            return None, 500
