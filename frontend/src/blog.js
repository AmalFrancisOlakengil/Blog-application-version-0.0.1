
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./blog.css";

function Blog() {
    const [blogs, setBlogs] = useState([]); // State to store blog entries
    const navigate = useNavigate(); // to navigate after logout
    // Fetch blog entries from the API when the component mounts
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
            const data = await response.json();
            setBlogs(data); // Set the fetched blog entries to state
        };

        fetchBlogs();
    }, []);
    const logout = async () => {
        
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include', 
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Show success message from Flask
                setBlogs([]); // Clear blog or other relevant state
    
                // Optional: Redirect user after logout
                navigate('/'); // Replace '/login' with your desired path
            } else {
                alert("An error occurred or you have already logged out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/create_blog">Create</Link></li>
                    <li><Link to="/Blog">Blog</Link></li>
                    <li><Link to="/userblogs">My Blogs</Link></li>
                    <li className="logout" onClick={() => logout()}>Log out</li>
                </ul>
            </nav>

            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-entry">
                        <h3>{blog.name}</h3>
                        <p className='blogcontent'>{blog.content}</p>
                        <p className="blog-date">Posted on: {blog.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Blog;
