import React, { useState, useEffect } from 'react';
import './OverViewPageStyles.css'; // Import your custom CSS file for styling
import { Container, Row, Col } from 'react-bootstrap';

function OverViewPage() {
    const [memes, setMemes] = useState([]);
    const [displayedMemes, setDisplayedMemes] = useState(3);
    const [loading, setLoading] = useState(false);
    const [allMemesDisplayed, setAllMemesDisplayed] = useState(false);
    const [sortBy, setSortBy] = useState('votes');
    const [filterValue, setFilterValue] = useState('');

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
                }, 2000); // Delay of 4 seconds
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, displayedMemes, allMemesDisplayed, memes]);

    const filteredMemes = memes.filter(meme => meme.title.toLowerCase().includes(filterValue.toLowerCase()));

    const sortedMemes = [...filteredMemes].sort((a, b) => {
        if (sortBy === 'votes' || sortBy === 'id') {
            return a[sortBy] - b[sortBy];
        } else if (sortBy === 'votesDesc' || sortBy === 'idDesc') {
            return b[sortBy.slice(0, -4)] - a[sortBy.slice(0, -4)];
        } else if (sortBy === 'alphabeticalAZ' || sortBy === 'alphabeticalZA') {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            return sortBy === 'alphabeticalAZ' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
        return 0;
    });

    const handleVote = async (memeId, voteType) => {
        try {
            const response = await fetch(`http://localhost:3000/memes/${memeId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ voteType: voteType })
            });
            if (!response.ok) {
                throw new Error('Failed to vote');
            }
            // Assuming the server returns updated meme data
            const updatedMemeData = await response.json();
            setMemes(prevMemes => {
                return prevMemes.map(meme => {
                    if (meme.id === memeId) {
                        return updatedMemeData;
                    }
                    return meme;
                });
            });
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="view-page-container">
            <h1 className="page-title">Memes</h1>
            <div className="filter-sort" style={{ marginBottom: '40px' }}>
                <label htmlFor="filterInput">Filter by Title:</label>
                <input
                    type="text"
                    id="filterInput"
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                />
                <label htmlFor="sortBySelect">Sort by:</label>
                <select
                    id="sortBySelect"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="votes">Votes (Lowest to Highest)</option>
                    <option value="votesDesc">Votes (Highest to Lowest)</option>
                    <option value="id">ID (Lowest to Highest)</option>
                    <option value="idDesc">ID (Highest to Lowest)</option>
                    <option value="alphabeticalAZ">Alphabetical A to Z</option>
                    <option value="alphabeticalZA">Alphabetical Z to A</option>
                </select>
            </div>
            <ul className="memes-list">
                {sortedMemes.slice(0, displayedMemes).map((meme, index) => (
                    <li key={index} className="meme-item" style={{ marginBottom: '60px' }}>
                        <h2 className="meme-title">{meme.title}</h2>
                        <p className="meme-votes">Votes: {meme.votes}</p>
                        <div className="meme-buttons">
                            <button onClick={() => handleVote(meme.id, 'upvote')}>Upvote</button>
                            <button onClick={() => handleVote(meme.id, 'downvote')}>Downvote</button>
                        </div>
                        <p className="meme-comments">Comments: {meme.comments.length}</p>
                        <p className="meme-screen-reader">Description: {meme.screen_reader}</p>
                        <img className="meme-image" src={"/assets/" + meme.file_name} alt={meme.title} />
                    </li>
                ))}
            </ul>
            {loading && <div className="spinner"></div>}
        </div>
    );
}

export default OverViewPage;
