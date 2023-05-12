import React from 'react';
import { Button } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';

const Authorization = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        axios.post('https://localhost:5001/accounts/login', {
            email: email,
            password: password,
        }, 
        {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
            }).then (function(response) {
                sessionStorage.setItem('token', response.data.token);
                window.location.assign('http://localhost:3000/home/clients');
            }).catch(function (error) {
                alert(error.response.data);
            })
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-light vh-100">
            <div className='bg-white p-3 rounded w-25'>
                <form action="">
                    <h2>Sing-In</h2>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input onChange={emailChange} type="email" placeholder="Enter Email" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input onChange={passwordChange} type="password" placeholder="Enter Password" className='form-control rounded-0'/>
                    </div>
                    <Button onClick={login} className='btn btn-default border w-100 rounded-0 text-decoration-none'>Log in</Button>
                    <p></p>
                    <Button onClick={() => window.location.assign('http://localhost:3000/register')} className='btn btn-default border w-100 rounded-0 text-decoration-none'>Create Account</Button>
                </form>
            </div>
        </div>
    );
} 

export default Authorization;