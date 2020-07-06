import os
from app import app, db
from app.models import Todo

@app.shell_context_processor
def make_shell_context():
    return { 'db': db, 'Todo': Todo}

# if __name__ == "__main__":
#     app.run(host="localhost", port=int(os.environ.get("PORT", 5000)))
