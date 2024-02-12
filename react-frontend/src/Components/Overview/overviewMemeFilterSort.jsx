// overviewMemeFilterSort.jsx
import React from 'react';

const MemeFilterSort = ({ filterValue, setFilterValue, sortBy, setSortBy }) => {
    return (
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
    );
};

export default MemeFilterSort;
