
# Blog Application

This is a fully functional blog application built using Flask and Python, designed to let users create, view, and manage blog posts in a clean and intuitive interface.  
 **NOTE**: This APP is Deployed on a Free tier Backend Hosting Platform. Therefore Requests take about 20 seconds.

## API Reference

#### Create a new user account and login.

```http
  POST /api/signin
```

#### Login an existing user.

```http
 POST /api/login
```

#### Logout the currently logged-in user.

```http
 POST /api/logout
```
#### Create a new blog post.
🔒 Requires login (session-based)
```http
POST /api/submit
```
#### Get all public blog posts.

```http
GET /api/blogs
```

#### Get all blog posts created by the logged-in user.
🔒 Requires login

```http
GET /api/userblogs
```

#### Delete a specific blog post owned by the logged-in user.

```http
DELETE /api/userblogs/<int:blog_id>
```

#### Update a blog post owned by the logged-in user.

```http
PUT /api/userblogs/<int:blog_id>
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Secret key for Flask session security**  
SECRET_KEY=your_flask_secret_key

**PostgreSQL or SQLite database URL (used by SQLAlchemy)**
DATABASE_URL=postgresql://username:password@hostname:port/dbname

**CORS URL**  
To have your backend environment endpoint

## Tech Stack

**Client:** React, Next

**Server:** Flask


## Features

🖋️ Post Creation & Editing – Add, update, and delete blog posts

👤 User Authentication – Secure login and registration 

📦 Clean Project Structure – Scalable for further development or deployment


## Optimizations

- Moved from Sql to Postgres for faster DataBase Management.
- Move to Redis Session Management from Filesystem (Pending)


## Demo

[Live Demo](https://blog-application-version-0-0-1.vercel.app/)


