import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import API from '../../API.js';

import MovieMetroNetwork from '../../assets/MovieMetroNetwork.svg';
import MovieMetroNetworkEmpty from '../../assets/MovieMetroNetworkEmpty.svg';

function GamePage() {
    const [gamePhase, setGamePhase] = useState('game_setup');
    const [segments, setSegments] = useState(null);
    const [errMessage, setErrMessage] = useState('');
    const [endpoints, setEndpoints] = useState([]);

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const topology = await API.getNetworkTopology();
                topology.segments.sort(() => { return Math.random() - 0.5 });
                setSegments(topology.segments);
            } catch (err) {
                setErrMessage(err.message);
            }
        };
        fetchSegments();
    }, []);

    if (errMessage) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{errMessage}</Alert>
            </Container>
        );
    }

    if (!segments) {
        return (
            <Container className="mt-5 text-center">
                <p>Caricamento rete metropolitana...</p>
            </Container>
        );
    }

    return (
        <Container className="justify-content-center">
            {gamePhase === "game_setup" && <Container>
                <h2 className="text-center mb-4">Try to Memorize the Network!</h2>

                <div className="my-4 p-3 bg-light rounded shadow-sm">
                    <img
                        src={MovieMetroNetwork}
                        alt="Full Network Map"
                        className="img-fluid rounded"
                        style={{ maxHeight: '60vh', objectFit: 'contain' }}
                    />
                </div>

                <Button onClick={async () => {
                    setGamePhase('game_planning');
                    const ep = await API.getEndpoints();
                    setEndpoints(ep);
                }}>Ready to Play!</Button>
            </Container>}

            {gamePhase === "game_planning" && <Container>
                <h2 className="text-center mb-4">Find the Route!</h2>
                <h3 className="text-center mb-4">From "{endpoints[0]}" to "{endpoints[1]}"</h3>

                <Row>
                    <Col>
                        <div className="p-3 bg-light rounded shadow-sm h-100 d-flex justify-content-center align-items-center">
                            <img
                                src={MovieMetroNetworkEmpty}
                                alt="Blind Network Map"
                                className="img-fluid rounded"
                                style={{ maxHeight: '100vh', objectFit: 'contain' }}
                            />
                        </div>
                    </Col>

                    <Col>
                        <h5 className="text-center mb-4">Available Segments!</h5>
                        <Table striped>
                            <tbody>
                                {segments.map((segment, index) => {
                                    return (<tr key={index}>
                                        <td>{segment.from}</td>
                                        <td>-</td>
                                        <td>{segment.to}</td>
                                    </tr>);
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Button className="mt-3" onClick={() => {
                    setGamePhase('game_execution');
                    // API call Post Game
                }}>Validate Route!</Button>
            </Container>}

            {gamePhase === "game_execution" && <Container>
                {console.log(gamePhase)}
            </Container>}

            {gamePhase === "game_results" && <Container>
                {console.log(gamePhase)}
            </Container>}

        </Container>
    );
}

export default GamePage;