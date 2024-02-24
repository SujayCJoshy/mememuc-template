import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './editorImagePicker.css'; // Ensure this path matches your file structure

const ImageGallery = ({ handleClose, onSelectImage }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: { count: 30 },
                headers: {
                    Authorization: 'Client-ID eFid7S_68kw5vFBNpeUjrEEWHP9plmNlMqopDga2MXM' // Replace YOUR_ACCESS_KEY with your Unsplash API key
                }
            });
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return (
        <div className="image-gallery-popup">
            <button onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0 }}>Close</button>
            <div style={{ columnCount: 3, columnGap: "1em" }}>
                {images.map((image, index) => (
                    <div key={index} style={{ marginBottom: "1em", cursor: 'pointer' }} onClick={() => onSelectImage(image.urls.full)}>
                        <img src={image.urls.small} alt={image.alt_description} style={{ width: "100%" }} />
                    </div>
                ))}
                {loading && <p>Loading more images...</p>}
            </div>
        </div>
    );
};

export default ImageGallery;
