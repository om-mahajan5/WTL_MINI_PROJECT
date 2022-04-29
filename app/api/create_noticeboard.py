from flask import request
from flask_restful import Resource
import nanoid
from app.api.join_noticeboard import add_member
from ..utils.sqlalchemy_object import db
from app.models import *


class create_noticeboard(Resource):
    def post(self):
        uid = request.json["uid"]
        name = request.json["name"]
        new_noticeboard = NoticeBoard(nbid=nanoid.generate('ABCDEF',size=6),uid=uid, name=name)
        db.session.add(new_noticeboard)
        db.session.commit()
        print(new_noticeboard.nbid)
        add_member(uid, new_noticeboard.nbid)
        return noticeboard_schema.dump(new_noticeboard), 201
