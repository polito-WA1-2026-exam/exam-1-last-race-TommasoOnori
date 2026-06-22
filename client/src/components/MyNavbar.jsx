import { Navbar, Container, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar({ loggedIn, user, handleLogout }) {
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Last Race!</Navbar.Brand>

                {errMessage && <Alert variant="danger">{errMessage}</Alert>}
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {loggedIn ?
                        (
                            <Navbar.Text>
                                <span className="me-3">Hello, {user?.name}!</span>
                                <Button onClick={() => {
                                    navigate('/');

                                    handleLogout().then(() => {
                                        setErrMessage('');
                                    }).catch((err) => {
                                        setErrMessage(err.message);
                                    });
                                }}>Log Out</Button>
                            </Navbar.Text>
                        ) : (
                            <Button as={Link} to="/login">Log In</Button>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;