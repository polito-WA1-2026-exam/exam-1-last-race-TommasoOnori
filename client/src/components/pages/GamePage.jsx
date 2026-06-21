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
    const [selectedRoute, setSelectedRoute] = useState([]);

    const [timerValue, setTimerValue] = useState(90);

    const [events, setEvents] = useState([]);
    const [score, setScore] = useState(20);

    const [currentAnimStep, setCurrentAnimStep] = useState(0);

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

    useEffect(() => {
        let timer = null;

        if (gamePhase === "game_planning") {
            if (timerValue > 0) {
                timer = setTimeout(() => {
                    setTimerValue(timeLeft => timeLeft - 1)
                }, 1000);
            } else if (timerValue === 0) {
                handleGameExecution();
            }
        }


        return () => clearTimeout(timer);

    }, [gamePhase, timerValue]);

    useEffect(() => {
        if (gamePhase === "game_execution" && events.length > 0) {
            if (currentAnimStep < events.length) {
                const timer = setTimeout(() => {
                    setScore((oldScore) => {
                        return oldScore + events[currentAnimStep].Value;
                    })

                    if (score < 0) {
                        setScore(0);
                    }

                    setCurrentAnimStep(oldAnimStep => oldAnimStep + 1);
                }, 1500);

                return () => clearTimeout(timer);
            }
        }
    }, [gamePhase, currentAnimStep]);

    const handleSegmentClick = (segment, isAlreadySelected) => {
        if (!isAlreadySelected) {
            let currentStation = '';

            if (selectedRoute.length === 0) {
                currentStation = endpoints[0];
            } else {
                currentStation = selectedRoute[selectedRoute.length - 1].to;
            }

            let segmentToAdd = { ...segment };

            if (currentStation === segment.to) {
                segmentToAdd = {
                    lineId: segment.lineId,
                    from: segment.to,
                    to: segmentToAdd.from
                }
            }

            setSelectedRoute((oldRoute) => {
                return [...oldRoute, segmentToAdd];
            })
        }
    };

    const handleGameExecution = async () => {
        try {
            console.log(selectedRoute);
            const result = await API.setGameRoute(selectedRoute, endpoints);

            if (result.valid) {
                setEvents(result.events);
                // setScore(result.score);
                setGamePhase('game_execution');
            } else {
                // setScore(result.score);
                setGamePhase('game_results');
            }
        } catch (err) {
            setErrMessage(err.message);
        }
    };

    const handleGameResults = () => {
        setGamePhase('game_results');
    };

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

                <div className="my-4 p-3 bg-light rounded shadow-sm">
                    <img
                        src={MovieMetroNetworkEmpty}
                        alt="Full Network Map"
                        className="img-fluid rounded"
                        style={{ maxHeight: '60vh', objectFit: 'contain' }}
                    />
                </div>

                <Row>
                    <Col>
                        <Container>
                            <h3 className="text-center mt-2">From "{endpoints[0]}" to "{endpoints[1]}"</h3>
                        </Container>
                    </Col>

                    <Col>
                        {timerValue <= 15 ? (
                            <Alert variant="danger">Time Left: {Math.floor(timerValue / 60)}:{Math.floor(timerValue % 60)}</Alert>
                        ) : (
                            <Alert variant="warning">Time Left: {Math.floor(timerValue / 60)}:{Math.floor(timerValue % 60)}</Alert>
                        )}
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col lg={8}>
                        <h4 className="text-cente mb-2">Available Segments!</h4>
                        <Table striped hover>
                            <tbody>
                                {segments.map((segment, index) => {
                                    const isSelected = selectedRoute.some((s) => {
                                        return s.from === segment.from && s.to === segment.to
                                    });
                                    return (
                                        <tr
                                            key={index}
                                            onClick={() => { handleSegmentClick(segment, isSelected); }}
                                            style={{
                                                cursor: isSelected ? 'not-allowed' : 'pointer',
                                                opacity: isSelected ? 0.5 : 1,
                                                backgroundColor: isSelected ? '#e9ecef' : 'inherit'
                                            }}>
                                            <td className="text-end align-middle">{segment.from}</td>
                                            <td className="text-center align-middle text-muted" style={{ width: '10%' }}>-</td>
                                            <td className="text-start align-middle">{segment.to}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>

                    <Col>
                        <h4>Route:</h4>
                        <ol>
                            {selectedRoute.map((segment, index) => {
                                return (
                                    <li key={index}>{segment.from} &rarr; {segment.to}</li>
                                );
                            })}
                        </ol>
                    </Col>
                </Row>
                <Row className="mb-4">

                    <Col>
                        <Button onClick={() => {
                            handleGameExecution();
                        }}>Validate Route!</Button>
                    </Col>
                    <Col>
                        <Button variant="warning" onClick={() => {
                            setSelectedRoute([]);
                        }}>Reset Route!</Button>
                    </Col>
                </Row>

            </Container>}

            {gamePhase === "game_execution" && <Container>
                <h2 className="text-center mb-4">Getting around by subway...</h2>
                <h3 className="text-center mb-4">Current Coins: {score}</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Segment</th>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Value</th>
                        </tr>

                    </thead>
                    <tbody>
                        {events.slice(0, currentAnimStep).map((event, index) => {
                            return (
                                <tr key={index}>
                                    <td>{selectedRoute[index].from} &rarr; {selectedRoute[index].to}</td>
                                    <td>{event.Name}</td>
                                    <td>{event.Description}</td>
                                    <td>{event.Value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>

                <Button className="mt-3" onClick={() => {
                    handleGameResults();
                }}>View Results!</Button>
            </Container >}

            {
                gamePhase === "game_results" && <Container>
                    {console.log(gamePhase)}
                </Container>
            }

        </Container >
    );
}

export default GamePage;