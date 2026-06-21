import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InstructionPage({ loggedIn }) {
    const navigate = useNavigate();

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <div className="game-rules mb-4">
                        <h2 className="mb-3">How to Play "Last Race"</h2>
                        <p className="lead" style={{ textAlign: 'justify' }}>
                            Your goal is to navigate the fictional underground network and reach your destination with the highest possible score.
                            Every game starts with a wallet containing exactly 20 coins.
                        </p>

                        <h4 className="mt-4 mb-3">The 4 Phases of the Game</h4>
                        <ul className="list-group list-group-flush mb-4" style={{ textAlign: 'justify' }}>
                            <li className="list-group-item">
                                <strong>1. Setup:</strong> You will see the complete network map showing all stations, lines, and connections. Take your time to memorize it before starting.
                            </li>
                            <li className="list-group-item">
                                <strong>2. Planning:</strong> You have exactly <strong>90 seconds</strong> to build your route from a randomly assigned starting station to a destination.
                                <ul>
                                    <li>The destination will be at least 3 segments away.</li>
                                    <li>You can select each segment only once.</li>
                                    <li>Line changes are strictly allowed only at interchange stations.</li>
                                    <li>You must submit your route before the time runs out.</li>
                                </ul>
                            </li>
                            <li className="list-group-item">
                                <strong>3. Execution:</strong> As you travel, random events will occur on each segment of your journey. These events can change your total coins with an effect ranging from -4 to +4.
                                <br />
                                <span className="text-danger fw-bold">Watch out:</span> If your submitted route is invalid, incomplete, or if the time runs out before you finish, you will lose all 20 coins and score zero.
                            </li>
                            <li className="list-group-item">
                                <strong>4. Result:</strong> Your final score corresponds to your remaining coins. If your final score is negative, it will be stored and shown as zero.
                            </li>
                        </ul>
                    </div>

                    {loggedIn ? (
                        <Button variant="primary" className="mb-4" onClick={() => { navigate('/game') }}>Start New Game!</Button>
                    ) : (
                        <Button variant="primary" className="mb-4" onClick={() => { navigate('/login') }}>Sing in to Play!</Button>
                    )
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default InstructionPage;