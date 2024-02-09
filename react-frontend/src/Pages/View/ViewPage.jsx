import React, { useState, useEffect } from 'react';
import './ViewPageStyles.css'; // Import your custom CSS file for styling
import { Container, Row, Col } from 'react-bootstrap';

function ViewPage() {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        async function fetchMemes() {
            try {
                const response = await fetch('./memes.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch memes');
                }
                const data = await response.json();
                setMemes(data);
            } catch (error) {
                console.error('Error fetching memes:', error);
            }
        }

        fetchMemes();
    }, []);

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col className="bg-coral d-flex align-items-center justify-content-center">
                    {memes.map((meme, index) => (
                        <div key={index}>
                            <h2>{meme.title}</h2>
                            <p>Votes: {meme.votes}</p>
                            {/* Render other meme information */}
                            <img src={`/assets/${meme.file_path}.jpg`} alt={meme.screen_reader} />
                            {/* Render vote buttons */}
                            {/* You can use meme.vote_buttons to render vote buttons */}
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default ViewPage;
