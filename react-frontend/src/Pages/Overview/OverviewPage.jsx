import React, { useState, useEffect } from 'react';
import '../../Styles/Overview/overviewPage.css'; // Import your custom CSS file for styling
import MemeFilterSort from '../../Components/Overview/overviewMemeFilterSort';
import MemeList from '../../Components/Overview/overviewMemeList';

function OverviewPage() {
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

    // Adjusted return statement to include new components
    return (
        <div className="view-page-container">
            <h1 className="page-title">Memes</h1>
            <MemeFilterSort
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <MemeList memes={sortedMemes.slice(0, displayedMemes)} handleVote={handleVote} />
            {loading && <div className="spinner"></div>}
        </div>
    );
}

export default OverviewPage;
