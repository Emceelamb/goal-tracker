from app import db
from datetime import datetime

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    createtime = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    goaltime = db.Column(db.Integer)
    status = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<Todo {}>'.format(self.body)

