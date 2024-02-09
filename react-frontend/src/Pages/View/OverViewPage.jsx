import React, { useState, useEffect } from 'react';
import './OverViewPageStyles.css'; // Import your custom CSS file for styling
import { Container, Row, Col } from 'react-bootstrap';

function OverViewPage() {
    const [memes, setMemes] = useState([]);
    const [displayedMemes, setDisplayedMemes] = useState(3);
    const [loading, setLoading] = useState(false);
    const [allMemesDisplayed, setAllMemesDisplayed] = useState(false);

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

    useEffect(() => {
        function handleScroll() {
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

            if (isBottom && !loading && !allMemesDisplayed) {
                setLoading(true);
                setTimeout(() => {
                    const nextDisplayedMemes = displayedMemes + 3;
                    if (nextDisplayedMemes >= memes.length) {
                        setDisplayedMemes(memes.length);
                        setAllMemesDisplayed(true);
                        setLoading(false);
                    } else {
                        setDisplayedMemes(nextDisplayedMemes);
                        setLoading(false);
                    }
                }, 4000); // Delay of 4 seconds
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, displayedMemes, allMemesDisplayed, memes]);

    return (
        <div className="view-page-container">
            <h1 className="page-title">Memes</h1>
            <ul className="memes-list">
                {memes.slice(0, displayedMemes).map((meme, index) => (
                    <li key={index} className="meme-item">
                        <h2 className="meme-title">{meme.title}</h2>
                        <p className="meme-votes">Votes: {meme.votes}</p>
                        <p className="meme-screen-reader">Description: {meme.screen_reader}</p>
                        <img className="meme-image" src={meme.file_path} alt={meme.title} />
                    </li>
                ))}
            </ul>
            {loading && <div className="spinner"></div>}
        </div>
    );
}

export default OverViewPage;
