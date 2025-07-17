from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from datetime import datetime, timezone
import os

app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv('SECRET_KEY')  # Set a secret key for sessions
CORS(app, origins=["https://blog-application-version-0-0-1.vercel.app"], supports_credentials=True)

app.config['SESSION_TYPE'] = 'filesystem'  # Or 'redis' for better scalability
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database models
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    blog = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

with app.app_context():
    db.create_all()

#signin 
@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    new_acc = Account(name = name, email = email, password = password)
    db.session.add(new_acc)
    db.session.commit()
    session['user_id'] = new_acc.id
    return jsonify({"message": "Signed in successfully!"}), 201

# Route to handle user login and create a session
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Query the database for the account
    user = Account.query.filter_by(email=email, password=password).first()
    if user:
        session['user_id'] = user.id  # Store the user ID in the session
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# Route to handle logout
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user_id from the session
    return jsonify({"message": "Logged out successfully"}), 200

# Route to submit a blog post (requires login)
@app.route('/api/submit', methods=['POST'])
def submit():
    if 'user_id' not in session:  # Check if user is logged in
        print(session['user_id'])
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    blog_content = data.get('blog')
    user_id = session['user_id']  # Get the user ID from the session
    name = Account.query.filter_by(id = user_id).first().name
    new_blog = Blog(blog=blog_content, user_id=user_id, name = name)
    db.session.add(new_blog)
    db.session.commit()

    return jsonify({"message": "Blog post created successfully!"}), 201

# Route to get all blogs
@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    blog_list = [{"id": blog.id,"name": blog.name, "user_id": blog.user_id, "content": blog.blog, 'date': blog.date_created.strftime('%d %B %Y')} for blog in blogs]
    return jsonify(blog_list), 200

@app.route('/api/userblogs', methods=['GET'])
def get_userblogs():
        userid = session['user_id']
        blogs = Blog.query.filter_by(user_id = userid)
        blog_list = [{"id": blog.id,"name": blog.name, "user_id": blog.user_id, "content": blog.blog, 'date': blog.date_created.strftime('%d %B %Y')} for blog in blogs]
        return jsonify(blog_list), 200

@app.route('/api/userblogs/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    # Get the user's ID from the session
    userid = session.get('user_id')
    
    # Find the blog by ID and user ID to make sure the user owns the blog
    blog = Blog.query.filter_by(id=blog_id, user_id=userid).first()
    
    # Check if the blog exists and belongs to the user
    if blog is None:
        return jsonify({"error": "Blog not found or you do not have permission to delete it"}), 404
    
    # Delete the blog from the database
    db.session.delete(blog)
    db.session.commit()
    
    return jsonify({"message": "Blog deleted successfully"}), 200

@app.route('/api/userblogs/<int:blog_id>', methods=['PUT'])
def update_blog(blog_id):
    # Get the user's ID from the session
    userid = session.get('user_id')
    
    # Find the blog by ID and user ID to ensure the blog belongs to the user
    blog = Blog.query.filter_by(id=blog_id, user_id=userid).first()
    
    if blog is None:
        return jsonify({"error": "Blog not found or you do not have permission to edit it"}), 404

    # Get the new data from the request
    data = request.get_json()

    blog.blog = data.get('content', blog.blog)

    db.session.commit()

    return jsonify({"message": "Blog updated successfully"}), 200



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
