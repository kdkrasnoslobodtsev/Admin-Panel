import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useState } from 'react';

const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = () => {
        if (password !== confirmPassword) {
            alert("Not equal passwords");
        } else {
            axios.post('https://localhost:5001/accounts/register', {
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }).catch(function (response) {
                alert(response.data);
            });
            window.location.assign('http://localhost:3000');
        }
    }

    const firstNameChange = (event) => {
        setFirstName(tmp => event.target.value);
    }

    const lastNameChange = (event) => {
        setLastName(tmp => event.target.value);
    }

    const middleNameChange = (event) => {
        setMiddleName(tmp => event.target.value);
    }

    const emailChange = (event) => {
        setEmail(tmp => event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(tmp => event.target.value);
    }

    const confirmPasswordChange = (event) => {
        setConfirmPassword(tmp => event.target.value);
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="">
                    <h2>Sign-Up</h2>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>First Name</strong></label>
                        <input onChange={firstNameChange} type="email" placeholder="First Name" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Last Name</strong></label>
                        <input onChange={lastNameChange} type="email" placeholder="Last Name" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Middle Name</strong></label>
                        <input onChange={middleNameChange} type="email" placeholder="Middle Name" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input onChange={emailChange} type="email" placeholder="Email" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input onChange={passwordChange} type="password" placeholder="Password" className='form-control rounded-0'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Confirm Password</strong></label>
                        <input onChange={confirmPasswordChange} type="password" placeholder="Confirm Password" className='form-control rounded-0'/>
                    </div>
                    <Button className='btn btn-default border w-100 rounded-0 text-decoration-none' onClick={register}>Sign up</Button>
                </form>
            </div>
        </div>
    );
} 

export default Registration;