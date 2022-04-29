from app.models.NoticeBoard import NoticeBoard
from app.models.NoticeBoard import noticeboard_schema
from ..utils.sqlalchemy_object import db, ma
from app.models import UserNoticeBoard, user_noticeboard_schema


def get_user_noticeboards(user_uid):
    noticeboards = (
        db.session.query(NoticeBoard, UserNoticeBoard)
        .filter(UserNoticeBoard.uid == user_uid)
        .with_entities(
            NoticeBoard.name, NoticeBoard.nbid, NoticeBoard.uid, NoticeBoard.timecreated
        )
        .all()
    )
    return noticeboard_schema.dump(noticeboards, many=True)
