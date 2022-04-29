from ..utils.sqlalchemy_object import db, ma
from sqlalchemy.orm import relationship
from datetime import datetime


class User(db.Model):
    __tablename__ = "user"
    uid = db.Column(db.String(64), primary_key=True)
    name = db.Column(db.String(50))
    timecreated = db.Column(db.DateTime(), default=datetime.utcnow)
    relationship("UserNoticeBoard", backref="user")
    relationship("noticeboard", backref="user")
    relationship("notice", backref="user")

    def __repr__(self):
        return f"<User {self.name}>"


class UserSchema(ma.Schema):
    class Meta:
        fields = ("uid", "name", "timecreated")
        model = User


user_schema = UserSchema()
user_schema = UserSchema(many=True)
