from app.models.NoticeBoard import NoticeBoard,noticeboard_schema
from ..utils.sqlalchemy_object import db, ma
from app.models import UserNoticeBoard


def get_user_noticeboards(user_uid):
    noticeboards = (
        db.session.query(NoticeBoard, UserNoticeBoard)
        .join(UserNoticeBoard)
        .filter(UserNoticeBoard.uid == user_uid)
        .with_entities(
            NoticeBoard.name, NoticeBoard.nbid, NoticeBoard.uid, NoticeBoard.timecreated
        )
        .all()
    )
    for noticeboard in noticeboards:
        print(noticeboard.uid)
    print(
        f"<__________{user_uid},{noticeboard_schema.dump(noticeboards, many=True)}_______>"
    )
    return noticeboard_schema.dump(noticeboards, many=True)
