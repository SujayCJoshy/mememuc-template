// MemeFilterSort.jsx
import React from 'react';

const MemeFilterSort = ({ filterValue, setFilterValue, sortBy, setSortBy }) => {
    return (
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
    );
};

export default MemeFilterSort;
