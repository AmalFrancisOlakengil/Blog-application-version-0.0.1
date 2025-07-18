import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./signin.css"
import "./common.css"; 
function Signin(){
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleSignin = async (event) => {
        event.preventDefault(); // Prevent page reload on form submission

        // Make a POST request to the backend with form data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message from Flask
            setname('');
            setemail('');
            setpassword('');
            navigate('/create_blog');
        } else {
            alert("This account already exists or There was an error");
        }
      
    };

    return(<>  
    <center>
    <div className='signin'>
        <form onSubmit={handleSignin}>
            <h1>Signin</h1>
            <input type='text' required placeholder='Name' value={name}
                                            onChange={(e) => setname(e.target.value)}></input><br></br>
            <input type='email' required placeholder='Email' value={email}
                                            onChange={(e) => setemail(e.target.value)}></input><br></br>
            <input type='password' required placeholder='password' value={password}
                                            onChange={(e) => setpassword(e.target.value)}></input><br></br>
            <input type="submit" value="Submit" className="submit" />
        </form>
        <h3>If you already have an Account <Link to="/login">"Click here!"</Link></h3>
    </div>
    </center>
    <center><h4>Disclaimer: Requests can take up to 50 seconds</h4></center>
    </>);
}

export default Signin;