import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrMessage('');

        handleLogin({ username, password }).then(() => {
            navigate('/');
        }).catch((err) => {
            setErrMessage("Invalid credentials.");
        });
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Sign in to join Last Race</h2>

                    {errMessage && <Alert variant="danger">{errMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email address." value={username} onChange={(e) => {
                                setUsername(e.target.value);
                            }} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Insert Password</Form.Label>
                            <Form.Control type="passoword" placeholder="Enter password." value={password} onChange={(e) => {
                                setPassword(e.target.value);
                            }} required />
                        </Form.Group>

                        <Button type="submit">Sign In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;