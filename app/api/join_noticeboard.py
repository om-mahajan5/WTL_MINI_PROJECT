from flask import request
from flask_restful import Resource
from ..utils.sqlalchemy_object import db
from app.models import *
from app.models.NoticeBoard import noticeboard_schema,NoticeBoard

def add_member(uid, nbid):
    new_noticeboard = UserNoticeBoard(uid=uid, nbid=nbid)
    db.session.add(new_noticeboard)
    db.session.commit()
    noticeboard = NoticeBoard.query.filter(NoticeBoard.nbid==nbid)
    return noticeboard_schema.dump(noticeboard[0])


class join_noticeboard_api(Resource):
    def post(self):
        uid = request.json["uid"]
        nbid = request.json["nbid"]
        noticeboard = add_member(uid=uid,nbid=nbid)
        print(noticeboard)
        return noticeboard,201
