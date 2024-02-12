// ColorPopup.js
import React from 'react';

const ColorPopup = ({ tempCanvasColor, setTempCanvasColor, confirmCanvasColorChange }) => {
    return (
        <div style={{ textAlign: "left", marginLeft: "40px", marginTop: "20px"  }}>
            <label htmlFor="canvasColor">Canvas Color:</label>
            <input
                type="color"
                value={tempCanvasColor}
                onChange={(e) => setTempCanvasColor(e.target.value)}
            />
            <br/>
            <button onClick={confirmCanvasColorChange}>Confirm Color</button>
        </div>
    );
};

export default ColorPopup;
