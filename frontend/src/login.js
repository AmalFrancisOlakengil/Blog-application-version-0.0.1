import React, {useState} from "react";
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
function Login(){
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent page reload on form submission

        // Make a POST request to the backend with form data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message from Flask
            setemail('');
            setpassword('');
            navigate("/create_blog");
        } else {
            alert("Error logining in");
        }
       
    };

    return(<>  
    <div className='login'>
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type='email' required placeholder='Email' value={email}
                                            onChange={(e) => setemail(e.target.value)}></input><br></br>
            <input type='password' required placeholder='password' value={password}
                                            onChange={(e) => setpassword(e.target.value)}></input><br></br>
            <input type="submit" value="Submit" className="submit" />
        </form>
        <center><h3><Link to="/">"Go Back"</Link></h3></center>  
    </div>
    </>);
}

export default Login