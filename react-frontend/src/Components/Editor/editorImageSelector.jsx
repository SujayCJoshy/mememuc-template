// ImageSelector.js

import React, { useState } from 'react';
import ImageGallery from "./editorImagePicker"; // Assuming path is correct
import DrawingCanvas from "./editorImageDraw"; // Assuming path is correct
import Camera from "./editorImageCamera"; // Assuming path is correct

const ImageSelector = ({ handleImageSelect, handleImageUrlChange, imageUrl, handleAddImageUrl, handleSelectImage }) => {
    const [showGallery, setShowGallery] = useState(false);
    const [showDrawing, setShowDrawing] = useState(false);
    const [showCamera, setShowCamera] = useState(false);

    return (
        <div>
            <div className="popup">
                <input type="file" accept="image/*" onChange={handleImageSelect} />
                <input type="text" placeholder="Enter Image URL" value={imageUrl} onChange={handleImageUrlChange} />
                <button onClick={handleAddImageUrl}>Add Image</button>
                <button onClick={() => setShowGallery(!showGallery)}>Choose Online Image</button>
                <button onClick={() => setShowDrawing(!showDrawing)}>Draw Image</button>
                <button onClick={() => setShowCamera(!showCamera)}>Take Photo</button>
            </div>
            {showGallery && <ImageGallery handleClose={() => setShowGallery(false)} onSelectImage={handleSelectImage} />}
            {showDrawing && <DrawingCanvas handleClose={() => setShowDrawing(false)} onSelectImage={handleSelectImage} />}
            {showCamera && <Camera onClose={() => setShowCamera(false)} onCapture={handleSelectImage} />}
        </div>
    );
};

export default ImageSelector;
