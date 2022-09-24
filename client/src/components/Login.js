import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {

const [userFormData, setUserFormData] = useState({ email: '', password: ''});
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [login, {error}] = useMutation(LOGIN_USER);

useEffect(() => {
    if (error) {
        setShowAlert(true);
    } else {
        setShowAlert(false)
    }
}, [error]);

const handleInputChange = (event) => {
    const {name, value} = event.target;
    setUserFormData({ ...userFormData, [name]: value});
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    };

    try {
        const {data} = await login({
            variables: { ...userFormData},
        });

        console.log(data);
        Auth.login(data.login.token);
    } catch (e) {
        console.error(e);
    }

    // clears the form
    setUserFormData({
        email: '',
        password: '',
    });
};

    return (
        <>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant='danger'>
                Either your username or password is incorrect.
            </Alert>
            <Form.Group>
                <Form.Label htmlFor="email">
                    Email
                </Form.Label>
                <Form.Control
                type='email'
                placeholder="Your Email Address"
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    A valid email address is required. 
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="password">
                    Password
                </Form.Label>
                <Form.Control
                type='password'
                placeholder="Your Password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
                />
                <Form.Control.Feedback type='invalid'>
                    Please enter your password. 
                </Form.Control.Feedback>
            </Form.Group>
            <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'
            >
                Submit
            </Button>
        </Form>
        </>
    );
};