from ..utils.sqlalchemy_object import db
from app.models import *


def get_user_info(user_uid, user_name):
    user = User.query.filter(User.uid == user_uid)
    if not user.one_or_none():
        print(f"Creating new user: uid {user_uid}, Name:{user_name}")
        new_user = User(uid=user_uid, name=user_name)
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(User.query.filter(User.uid == user_uid))[0]
    else:
        return user_schema.dump(user)[0]
