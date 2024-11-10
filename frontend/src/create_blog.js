import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./create_blog.css";

function Create() {
    // Define state for form inputs
    const [name, setName] = useState('');
    const [blog, setBlog] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload on form submission

        // Make a POST request to the backend with form data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, blog }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message from Flask
            setName(''); // Clear the form
            setBlog('');
        } else {
            alert("Error submitting blog post"); // Show error message if any
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Create</Link></li>
                    <li><Link to="/Blog">Blog</Link></li>
                </ul>
            </nav>
            <center>
                <div className="forms">
                    <h1>Create a Blog!</h1>
                    <form onSubmit={handleSubmit}> {/* Update form's submit handler */}
                        <center>
                            <label htmlFor="name"><b>NAME</b></label>
                            <br />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="name"
                                required
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <label htmlFor="blog"><b>BLOG</b></label>
                            <br />
                            <textarea
                                name="blog"
                                id="blog"
                                className="blog"
                                required
                                placeholder="Share your thoughts!"
                                rows="5"
                                cols="50"
                                value={blog}
                                onChange={(e) => setBlog(e.target.value)}
                            />
                            <br />
                            <input type="submit" value="Submit" className="submit" />
                        </center>
                    </form>
                </div>
            </center>
        </>
    );
}

export default Create;

