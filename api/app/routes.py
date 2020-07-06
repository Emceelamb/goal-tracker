from flask import redirect, request, jsonify
from app import app, db
from app.models import Todo
from werkzeug.urls import url_parse
import time

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api', methods=['GET', 'POST'])
def api():
    if request.method == 'GET':
        todos = []
        data = Todo.query.all()
     
        for todo in data:
            item = {
                "id": todo.id,
                "todo": todo.body,
                "createtime": todo.createtime,
                "goaltime": todo.goaltime,
                "status": todo.status
                }
            todos.append(item.copy())
        print(todos)
        return jsonify(todos)
    elif request.method == 'POST':
        data = request.json
        item = Todo(body=data["todo"], goaltime=data["goal"])
        db.session.add(item)
        db.session.commit()
        print (item, "ADDED!")
        print (data["todo"])
        return jsonify(data)

