// MemeNavigation.jsx
import React from 'react';

const MemeNavigation = ({ handlePrevious, handleNext, handleRandom, handleAutoplay, autoplay }) => {
    return (
        <div className="navigation-buttons">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleRandom}>Random</button>
            <button onClick={handleAutoplay}>
                {autoplay ? 'Stop Autoplay' : 'Start Autoplay'}
            </button>
        </div>
    );
};

export default MemeNavigation;
