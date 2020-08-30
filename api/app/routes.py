from flask import redirect, request, jsonify
from app import app, db
from app.models import Todo
from werkzeug.urls import url_parse
from datetime import datetime

@app.route('/time')
def get_current_time():
    return {'time': datetime.utcnow()}

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

@app.route('/api/<id>', methods=['DELETE'])
def delete_todo(id):
    item = Todo.query.get(id)

    print(id, item, "\n\n\n\n")
    db.session.delete(item)
    db.session.commit()

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
