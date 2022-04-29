from email.policy import default
from ..utils.sqlalchemy_object import db, ma
from sqlalchemy.orm import relationship
from datetime import datetime
import nanoid


class Notice(db.Model):
    __tablename__ = "notice"
    nid = db.Column(db.String(64), primary_key=True,default=nanoid.generate('ABCDEFGHI',size=10))
    uid = db.Column(db.String(64), db.ForeignKey("user.uid"))
    title = db.Column(db.String(1000))
    body = db.Column(db.Text())
    nbid = db.Column(db.String(6),db.ForeignKey("noticeboard.nbid"))
    timecreated = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Notice {self.title}>"


class NoticeSchema(ma.Schema):
    class Meta:
        fields = ("nid", "uid" ,"title","body", "nbid" ,"timecreated")
        model = Notice


notice_schema = NoticeSchema()
