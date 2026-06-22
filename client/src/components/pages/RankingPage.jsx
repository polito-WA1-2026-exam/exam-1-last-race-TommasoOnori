import { Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import API from '../../API';

function RankingPage() {
    const [ranking, setRanking] = useState([]);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        const retrieveRanking = async () => {
            try {
                const ranks = await API.getGeneralRanking();
                setRanking(ranks);
            } catch (err) {
                setErrMessage(err.message);
            }
        }
        retrieveRanking();
    }, []);

    if (errMessage) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{errMessage}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>General Ranking!</h2>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Maximum Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{result.Rank}</td>
                                        <td>{result.Email}</td>
                                        <td>{result.MaxScore}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default RankingPage;