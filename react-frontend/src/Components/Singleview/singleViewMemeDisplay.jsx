// MemeDisplay.jsx
import React from 'react';

const MemeDisplay = ({ meme }) => {
    if (!meme) return null;

    return (
        <div className="meme-container">
            <img src={"/assets/" + meme.file_name} alt="Meme" />
        </div>
    );
};

export default MemeDisplay;
