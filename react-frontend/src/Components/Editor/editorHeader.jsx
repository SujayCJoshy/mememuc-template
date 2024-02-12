// Header.js
import React from 'react';
import styles from '../../Styles/Editor/editor.css';

const Header = ({ handleToggleClick})  => {
    return (
        <header style={{ marginLeft: '20px' }}>
            <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"></link>
            <h1 className={styles.left} style={{ fontFamily: 'Arial' }}>Meme Editor</h1>
            <div>
            <button onClick={handleToggleClick} style={{ marginRight: '30px' }}>Select Image</button>
            </div>
        </header>
        
    );
};

export default Header;
