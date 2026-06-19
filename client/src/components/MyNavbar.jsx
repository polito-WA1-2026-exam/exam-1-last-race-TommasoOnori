import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar({ loggedIn, handleLogout }) {
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Last Race!</Navbar.Brand>

                <div className="d-flex align-items-center">
                    {loggedIn ?
                        (
                            <Button onClick={() => {
                                handleLogout();
                                navigate('/');
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