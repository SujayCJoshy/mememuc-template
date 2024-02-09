import React, { useState, useEffect } from 'react';
import './SingleViewPageStyles.css';
import { useParams, useNavigate } from 'react-router-dom';

function SingleViewPage() {
    const [memes, setMemes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [autoplay, setAutoplay] = useState(false);
    const currentMemeIndex = id ? parseInt(id, 10) - 1 : 0;

    useEffect(() => {
        async function fetchMemes() {
            try {
                const response = await fetch('/memes.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch memes');
                }
                const data = await response.json();
                console.log('Fetched memes successfully:', data);
                setMemes(data);
            } catch (error) {
                console.error('Error fetching memes:', error);
            }
        }

        fetchMemes();
    }, []);

    useEffect(() => {
        let intervalId;

        if (autoplay) {
            intervalId = setInterval(() => {
                const nextIndex = (currentMemeIndex + 1) % memes.length;
                navigate(`/single-view/${nextIndex + 1}`);
            }, 3000); // Change interval as needed
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [autoplay, currentMemeIndex, memes, navigate]);

    const handleNext = () => {
        const nextIndex = (currentMemeIndex + 1) % memes.length;
        navigate(`/single-view/${nextIndex + 1}`);
    };

    const handlePrevious = () => {
        const prevIndex = currentMemeIndex === 0 ? memes.length - 1 : currentMemeIndex - 1;
        navigate(`/single-view/${prevIndex + 1}`);
    };

    const handleRandom = () => {
        const randomIndex = Math.floor(Math.random() * memes.length);
        navigate(`/single-view/${randomIndex + 1}`);
    };

    const handleAutoplay = () => {
        setAutoplay(!autoplay);
    };

    if (!memes.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-view-page">
            <div className="meme-container">
                <img src={memes[currentMemeIndex]?.file_path} alt="Meme" />
            </div>
            <div className="navigation-buttons">
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
                <button onClick={handleRandom}>Random</button>
                <button onClick={handleAutoplay}>
                    {autoplay ? 'Stop Autoplay' : 'Start Autoplay'}
                </button>
            </div>
        </div>
    );
}

export default SingleViewPage;
