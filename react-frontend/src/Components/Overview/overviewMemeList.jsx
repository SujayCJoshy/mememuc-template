// overviewMemeList.jsx
import React from 'react';
import MemeItem from './overviewMemeItem';

const MemeList = ({ memes, handleVote }) => {
    return (
        <ul className="memes-list">
            {memes.map((meme, index) => (
                <MemeItem key={index} meme={meme} handleVote={handleVote} />
            ))}
        </ul>
    );
};

export default MemeList;
