import React, { useState, useEffect } from 'react';
import './SingleViewPageStyles.css';
import { useParams, useNavigate } from 'react-router-dom';

function SingleViewPage() {
    const [memes, setMemes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [autoplay, setAutoplay] = useState(false);
    const [sortBy, setSortBy] = useState('creationDate');
    const [filterValue, setFilterValue] = useState('');
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

    const filteredMemes = memes.filter(meme => meme.id.toString().includes(filterValue));

    const sortedMemes = [...filteredMemes].sort((a, b) => {
        if (sortBy === 'id') {
            return a.id - b.id;
        } else if (sortBy === 'idDesc') {
            return b.id - a.id; // Sort by ID in descending order
        } else if (sortBy === 'creationDate') {
            return a.creationDate - b.creationDate;
        } else if (sortBy === 'creationDateDesc') {
            return b.creationDate - a.creationDate; // Sort by creation date in descending order
        } else if (sortBy === 'alphabeticalAZ' || sortBy === 'alphabeticalZA') {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (sortBy === 'alphabeticalAZ') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        }
        return 0;
    });

    const handleNext = () => {
        const nextIndex = (currentMemeIndex + 1) % sortedMemes.length;
        navigate(`/single-view/${sortedMemes[nextIndex]?.id}`);
    };

    const handlePrevious = () => {
        const prevIndex = currentMemeIndex === 0 ? sortedMemes.length - 1 : currentMemeIndex - 1;
        navigate(`/single-view/${sortedMemes[prevIndex]?.id}`);
    };

    const handleRandom = () => {
        const randomIndex = Math.floor(Math.random() * sortedMemes.length);
        navigate(`/single-view/${sortedMemes[randomIndex]?.id}`);
    };

    const handleAutoplay = () => {
        setAutoplay(!autoplay);
    };

    return (
        <div className="single-view-page">
            <div className="filter-sort">
                <label htmlFor="filterInput">Filter by ID:</label>
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
                    <option value="id">ID (Lowest to Highest)</option>
                    <option value="idDesc">ID (Highest to Lowest)</option>
                    <option value="creationDate">Creation Date (Lowest to Highest)</option>
                    <option value="creationDateDesc">Creation Date (Highest to Lowest)</option>
                    <option value="alphabeticalAZ">Alphabetical A to Z</option>
                    <option value="alphabeticalZA">Alphabetical Z to A</option>
                </select>
            </div>
            <div className="meme-container">
                <img src={"/assets/" + sortedMemes[currentMemeIndex]?.file_name} alt="Meme" />
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
