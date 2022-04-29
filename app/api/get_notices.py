from flask import request
from flask_restful import Resource
from app.models import Notice, notice_schema


class get_notice_list(Resource):
    def get(self):
        nbid = request.args.get("nbid")
        notices = Notice.query.filter(Notice.nbid == nbid).all()
        print(notice_schema.dump(notices, many=True))
        return notice_schema.dump(notices, many=True)
