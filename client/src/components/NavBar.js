import React from "react";
import { useState } from "react";
import Link from 'react-router-dom';
import { Nav, Navbar, Container, Modal, Tab } from 'react-bootstrap';
import Login from './Login';
import SignUp from './SignUp';

import Auth from '../utils/auth';

export default function NavBar() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        Search for Books
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id='navbar'>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to='/'>
                                Search For Books
                            </Nav.Link>
                            {/* when logged in, shows Saved and Logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to='/saved'>
                                        Your Saved Books
                                    </Nav.Link>
                                    <Nav.Link onClick={() => setShowModal(true)}> Logout </Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={() => setShowModal(true)}>
                                    Login / Register
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* modal setup */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id=";signup-modal">
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link eventKey='login'> Login </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='signup'> Register </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <Login handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUp handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};