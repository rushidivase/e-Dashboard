import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => { //this code is because of there was a problem like when we type end point of login manually then it was redirected on login after login so we add this code
        let auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    })

    const handleLogin = async () => {
        console.warn(email, password)

        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/");
        }
        else {
            alert("Please Enter Correct Details...!")
        }

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3 border offset-4 p-3 shadow text-center mt-4'>
                    <h1 className='display-6 mb-4'>Login Page</h1>
                    <input type='text' placeholder='Enter Name'
                        className='form-control mt-2' onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    <input type='password' placeholder='Enter Password'
                        className='form-control mt-2'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button className='btn btn-info mt-2' onClick={handleLogin}>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Login
