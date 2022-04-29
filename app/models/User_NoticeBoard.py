from ..utils.sqlalchemy_object import db, ma


class UserNoticeBoard(db.Model):
    __tablename__ = "user_notice_board"
    uid = db.Column(db.String(64), db.ForeignKey("user.uid"), primary_key=True)
    nbid = db.Column(db.String(64), db.ForeignKey("noticeboard.nbid"), primary_key=True)

    def __repr__(self):
        return f"uid:{self.uid}"


class UserNoticeBoardSchema(ma.Schema):
    class Meta:
        fields = ("uid", "nbid")
        model = UserNoticeBoard


user_noticeboard_schema = UserNoticeBoardSchema()
