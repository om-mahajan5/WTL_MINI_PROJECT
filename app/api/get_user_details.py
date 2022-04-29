from flask import request
from flask_restful import Resource

from app.api.create_user import get_user_info
from app.api.get_user_noticeboards import get_user_noticeboards
from ..utils.sqlalchemy_object import db
from app.models import *


class get_user_details(Resource):
    def get(self):
        user_uid = request.args.get("uid")
        user_name = request.args.get("name")
        user_details = {}
        user_info = get_user_info(user_uid=user_uid, user_name=user_name)
        print(user_info)
        user_details.update(user_info)
        user_details.update({"NoticeBoards": get_user_noticeboards(user_uid=user_uid)})
        # print(get_user_info(user_uid=user_uid,user_name=user_name))
        # print(get_user_noticeboards(user_uid=user_uid))
        return user_details
