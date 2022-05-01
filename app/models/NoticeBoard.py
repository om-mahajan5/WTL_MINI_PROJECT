from ..utils.sqlalchemy_object import db, ma
from sqlalchemy.orm import relationship
from datetime import datetime
import nanoid


class NoticeBoard(db.Model):
    __tablename__ = "noticeboard"
    nbid = db.Column(db.String(64), primary_key=True)
    name = db.Column(db.String(50))
    uid = db.Column(db.String(64), db.ForeignKey("user.uid"))
    timecreated = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<NoticeBoard {self.name}>"


class NoticeBoardSchema(ma.Schema):
    class Meta:
        fields = ("nbid", "name", "timecreated","uid")
        model = NoticeBoard


noticeboard_schema = NoticeBoardSchema()