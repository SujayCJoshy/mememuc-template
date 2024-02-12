// TemplateButtons.js
import React from 'react';

const TemplateButtons = ({ handleTemplate1, handleTemplate2, handleTemplate3 }) => {
    return (
        <div style={{ display: 'flex', marginLeft: '30px', marginTop: '20px' }}>
            <div style={{ marginBottom: '10px', marginLeft: '-10px' }}>
                <button onClick={handleTemplate1} style={{ marginRight: '30px' }}>Template 1</button>
                <button onClick={handleTemplate2} style={{ marginRight: '30px' }}>Template 2</button>
                <button onClick={handleTemplate3} style={{ marginRight: '30px' }}>Template 3</button>
            </div>
        </div>
    );
};

export default TemplateButtons;
