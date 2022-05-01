from flask import request
from flask_restful import Resource
import nanoid

from app.api.join_noticeboard import add_member
from ..utils.sqlalchemy_object import db
from app.models import Notice,notice_schema


class delete_notice(Resource):
    def post(self):
        nid = request.json['nid']
        Notice.query.filter(Notice.nid==nid).delete()
        db.session.commit()
        return None, 200
