from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
app = Flask(__name__)
CORS(app)
CORS(app, origins=["https://blog-application-version-0-0-1.vercel.app"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

from datetime import datetime, timezone

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    blog = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

with app.app_context():
    db.create_all()

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    blog_content = data.get('blog')

    new_blog = Blog(name=name, blog=blog_content)
    db.session.add(new_blog)
    db.session.commit()

    return jsonify({"message": "Blog post created successfully!"}), 201

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    blog_list = [{"id": blog.id, "name": blog.name, "content": blog.blog, 'date': blog.date_created.strftime('%d %B %Y')} for blog in blogs]
    return jsonify(blog_list), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
