
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./blog.css";

function Blog() {
    const [blogs, setBlogs] = useState([]); // State to store blog entries

    // Fetch blog entries from the API when the component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
            const data = await response.json();
            setBlogs(data); // Set the fetched blog entries to state
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Create</Link></li>
                    <li><Link to="/Blog">Blog</Link></li>
                </ul>
            </nav>

            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-entry">
                        <h3>{blog.name}</h3>
                        <p>{blog.content}</p>
                        <p className="blog-date">Posted on: {blog.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Blog;
