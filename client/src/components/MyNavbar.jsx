import { Navbar, Container, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar({ loggedIn, handleLogout }) {
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Last Race!</Navbar.Brand>

                <div className="d-flex align-items-center">
                    {errMessage && <Alert variant="danger">{errMessage}</Alert>}

                    {loggedIn ?
                        (

                            <Button onClick={() => {
                                handleLogout().then(() => {
                                    navigate('/');
                                    setErrMessage('');
                                }).catch((err) => {
                                    setErrMessage(err.message);
                                });
                            }}>Log Out</Button>

                        ) : (
                            <Button as={Link} to="/login">Log In</Button>
                        )
                    }
                </div>

            </Container>
        </Navbar>
    );
}

export default MyNavbar;