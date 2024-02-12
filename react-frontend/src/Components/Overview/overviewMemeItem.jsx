// overviewMemeItem.jsx
import React from 'react';

const MemeItem = ({ meme, handleVote }) => {
    return (
        <li className="meme-item" style={{ marginBottom: '60px' }}>
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
    );
};

export default MemeItem;
