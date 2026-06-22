import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ResultsPhasePage({ setGamePhase, setEndpoints, setSelectedRoute, setEvents, score, setScore }) {
    const navigate = useNavigate();

    return (
        <Container>
            <h2>Your Final Score!</h2>

            <h3 className="mt-5 mb-5">{score} coins collected on the journey!</h3>

            <Row>
                <Col>
                    <Button onClick={() => {
                        setGamePhase('game_setup');

                        setEndpoints([]);
                        setSelectedRoute([]);

                        setEvents([]);
                        setScore(20);
                    }}>Play a New Game!</Button>
                </Col>

                <Col>
                    <Button variant="warning" onClick={() => {
                        navigate('/scores');
                    }}>Show Ranking!</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ResultsPhasePage;