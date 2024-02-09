import React, { useState, useEffect } from 'react';

function FilterComponent({ memes, setFilteredMemes }) {
    const [filterBy, setFilterBy] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [allIds, setAllIds] = useState([]);

    // Extract all unique IDs from memes data
    useEffect(() => {
        const uniqueIds = [...new Set(memes.map(meme => meme.id))];
        setAllIds(uniqueIds);
    }, [memes]);

    const handleFilterChange = (event) => {
        setFilterBy(event.target.value);
        setFilterValue(''); // Reset filter value when filter type changes
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const applyFilter = () => {
        let filteredMemes = [...memes];

        if (filterBy === 'someValue') {
            // Filter logic based on some numerical value
            // filteredMemes = filteredMemes.filter(meme => /* your filtering condition based on someValue */);
        } else if (filterBy === 'ID') {
            // Filter logic based on ID
            filteredMemes = filteredMemes.filter(meme => meme.id === filterValue);
        }

        setFilteredMemes(filteredMemes);
    };

    return (
        <div>
            <select value={filterBy} onChange={handleFilterChange}>
                <option value="">No Filter</option>
                <option value="someValue">Filter by Some Value</option>
                <option value="ID">Filter by ID</option>
                {/* Additional filtering options can be added here */}
            </select>
            {filterBy && filterBy === 'ID' && (
                <select value={filterValue} onChange={handleFilterValueChange}>
                    <option value="">All IDs</option>
                    {allIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>
            )}
            {filterBy && filterBy !== 'ID' && (
                <input
                    type="text"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    placeholder="Enter filter value"
                />
            )}
            <button onClick={applyFilter}>Apply Filter</button>
        </div>
    );
}

export default FilterComponent;
