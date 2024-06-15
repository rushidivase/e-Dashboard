import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp1() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigator = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth)
             {
            navigator("/");
        }
    })

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },

        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        
        if (result) {
            navigator("/");
        }
    }

    return (
        <div className='border shadow mt-4 col-4 offset-4 text-center p-3'>
            <h1>Register</h1>
            <input className='inputBox' type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='inputBox' type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='inputBox' type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='btn btn-info' onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp1
