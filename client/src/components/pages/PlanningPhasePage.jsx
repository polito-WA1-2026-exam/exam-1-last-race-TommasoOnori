import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import API from '../../API';

import MovieMetroNetworkEmpty from '../../assets/MovieMetroNetworkEmpty.svg';

function PlanningPhasePage({ gamePhase, setGamePhase, endpoints, segments, selectedRoute, setSelectedRoute, setEvents, setScore, setErrMessage }) {
    const [timerValue, setTimerValue] = useState(90);

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
            const result = await API.setGameRoute(selectedRoute, endpoints);

            if (result.valid) {
                setEvents(result.events);
                setScore(result.finalScore);
                setGamePhase('game_execution');
            } else {
                setScore(result.finalScore);
                setGamePhase('game_results');
            }
        } catch (err) {
            setErrMessage(err.message);
        }
    };

    return (
        <Container>
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
                                    return (s.from === segment.from && s.to === segment.to) || (s.from === segment.to && s.to === segment.from);
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

        </Container>
    );
}

export default PlanningPhasePage;