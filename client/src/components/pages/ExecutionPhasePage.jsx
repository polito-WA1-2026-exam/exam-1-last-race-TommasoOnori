import { Container, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function ExecutionPhasePage({ gamePhase, setGamePhase, events, selectedRoute }) {
    const [currentAnimStep, setCurrentAnimStep] = useState(0);

    useEffect(() => {
        if (gamePhase === "game_execution" && events.length > 0) {
            let timer = null;

            if (currentAnimStep < events.length) {
                timer = setTimeout(() => {
                    setCurrentAnimStep(oldAnimStep => oldAnimStep + 1);
                }, 3000);
            } else {
                timer = setTimeout(() => {
                    setGamePhase('game_results');
                }, 6000);
            }

            return () => clearTimeout(timer);
        }
    }, [gamePhase, currentAnimStep]);

    return (
        <Container>
            <h2 className="text-center mb-4">Getting around by subway...</h2>
            <h3 className="text-center mb-4">Starting Coins: 20</h3>
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
                                <td><b>{event.Value} Coins</b></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

export default ExecutionPhasePage;