import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './edit_blog.css';
import "./common.css"; 
function EditBlog() {
    const { blogId } = useParams(); // Get the blogId from the URL
    const [blog, setBlog] = useState({ content: '' });
    const history = useNavigate();

    // Fetch the blog data to populate the edit form
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userblogs/${blogId}`);
            const data = await response.json();
            setBlog(data); // Set the blog data to state
        };

        fetchBlog();
    }, [blogId]);

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedBlog = {
            content: blog.content,
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userblogs/${blogId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBlog),
            credentials: 'include',
        });

        if (response.ok) {
            // Redirect back to the userblogs page after successful update
            history('/userblogs');
        } else {
            alert('Failed to update blog');
        }
    };

    return (
        <>
        <center>
        <div className="edit-blog">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <center>                    
                        <textarea className='blogedit'
                        value={blog.content}
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                    /></center>
                </div>
                <button type="submit" className="submit">Save Changes</button>
            </form>
        </div>
        </center>
        </>
    );
}

export default EditBlog;
