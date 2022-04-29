from flask import request
from flask_restful import Resource
import nanoid

from app.api.join_noticeboard import add_member
from ..utils.sqlalchemy_object import db
from app.models import Notice,notice_schema


class create_notice(Resource):
    def post(self):
        new_notice = Notice(
            nid=nanoid.generate('ABCDEF',size=8),
            nbid=request.json["nbid"],
            title=request.json["title"],
            body=request.json["body"],
            uid=request.json["uid"],
        )
        db.session.add(new_notice)
        db.session.commit()
        print(new_notice.nid)
        return notice_schema.dump(new_notice), 201
