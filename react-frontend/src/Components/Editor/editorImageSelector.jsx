// ImageSelector.js
import React from 'react';

const ImageSelector = ({ handleImageSelect, handleImageUrlChange, imageUrl, handleAddImageUrl }) => {
    return (
        <div>
            <div className="popup">
                <input type="file" accept="image/*" onChange={handleImageSelect} />
                <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={handleImageUrlChange} />
                <button onClick={handleAddImageUrl}>Add Image</button>
            </div>
        </div>
    );
};

export default ImageSelector;
