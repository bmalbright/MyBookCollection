import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

import { ADD_USER } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import Auth from '..utils/auth';


export default function SignUp() {

    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // makes sure the form is complete
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                vairables: { ...userFormData },
            });
            console.log(data);
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: '',
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
                    variant='danger'>
                    There is a problem with your signup.
                </Alert>
                <Form.Group>
                    <Form.Control
                        type='text'
                        name='username'
                        placeholder='Create a username.'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please create a username.
                    </Form.Control.Feedback>
                    <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter your email address.'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='Please create a password.'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please create a password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={
                        !(userFormData.username && userFormData.email && userFormData.password)
                    }
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};