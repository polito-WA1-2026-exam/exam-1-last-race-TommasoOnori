import { Container, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import API from '../../API';

import MovieMetroNetwork from '../../assets/MovieMetroNetwork.svg';

function SetupPhasePage({ segments, setSegments, setErrMessage, setGamePhase, setEndpoints }) {

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

    if (!segments) {
        return (
            <Container className="mt-5 text-center">
                <p>Caricamento rete metropolitana...</p>
            </Container>
        );
    }

    return (
        <Container>
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
                const ep = await API.getEndpoints();
                setEndpoints(ep);
                setGamePhase('game_planning');
            }}>Ready to Play!</Button>
        </Container>
    );
}

export default SetupPhasePage;