import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./create_blog.css";

function Create() {
    // Define state for form inputs
    const [blog, setBlog] = useState('');
    const navigate = useNavigate(); // to navigate after logout
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload on form submission

        // Make a POST request to the backend with form data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/submit`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blog }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message from Flask
            setBlog('');
        } else {
            alert("you havent signed in or A Error occured");
        }
    };
    const logout = async () => {
        
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
                method: 'POST', credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Show success message from Flask
                setBlog(''); // Clear blog or other relevant state
    
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
                    <div>
                       <nav>
                             <ul>
                                    <li><Link to="/create_blog">Create</Link></li>
                                    <li><Link to="/Blog">Blog</Link></li>
                                    <li><Link to="/userblogs">My Blogs</Link></li>
                                    <li className="logout" onClick={() => logout()}>Log out</li>
                            </ul>
                        </nav>
                        <center>
                            <div className="forms">
                                <h1>Create a Blog!</h1>
                                <form onSubmit={handleSubmit}> {/* Update form's submit handler */}
                                    <center>
                                        <label><b>BLOG</b></label>
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
                    </div>
              
    );
}

export default Create;
