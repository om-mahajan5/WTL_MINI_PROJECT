from app import create_app
from .sqlalchemy_object import db

# db.init_app(create_app)
db.create_all(app=create_app())

#  python3 -m app.utils.create_db
