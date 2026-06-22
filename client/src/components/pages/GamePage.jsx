import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API.js';

import SetupPhasePage from './SetupPhasePage.jsx';
import MovieMetroNetworkEmpty from '../../assets/MovieMetroNetworkEmpty.svg';
import PlanningPhasePage from './PlanningPhasePage.jsx';
import ExecutionPhasePage from './ExecutionPhasePage.jsx';
import ResultsPhasePage from './ResultsPhasePage.jsx';

function GamePage() {
    const [gamePhase, setGamePhase] = useState('game_setup');
    const [segments, setSegments] = useState(null);
    const [errMessage, setErrMessage] = useState('');

    const [endpoints, setEndpoints] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState([]);

    const [events, setEvents] = useState([]);
    const [score, setScore] = useState(20);

    if (errMessage) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{errMessage}</Alert>
            </Container>
        );
    }

    return (
        <Container className="justify-content-center">
            {gamePhase === "game_setup" &&
                <SetupPhasePage
                    segments={segments}
                    setSegments={setSegments}
                    setErrMessage={setSegments}
                    setGamePhase={setGamePhase}
                    setEndpoints={setEndpoints}
                />}

            {gamePhase === "game_planning" &&
                <PlanningPhasePage
                    gamePhase={gamePhase}
                    setGamePhase={setGamePhase}
                    endpoints={endpoints}
                    segments={segments}
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    setEvents={setEvents}
                    setScore={setScore}
                    setErrMessage={setErrMessage}
                />}

            {gamePhase === "game_execution" &&
                <ExecutionPhasePage
                    gamePhase={gamePhase}
                    setGamePhase={setGamePhase}
                    events={events}
                    selectedRoute={selectedRoute}
                />}

            {gamePhase === "game_results" &&
                <ResultsPhasePage
                    setGamePhase={setGamePhase}
                    setEndpoints={setEndpoints}
                    setSelectedRoute={setSelectedRoute}
                    setEvents={setEvents}
                    score={score}
                    setScore={setScore}
                />
            }

        </Container >
    );
}

export default GamePage;