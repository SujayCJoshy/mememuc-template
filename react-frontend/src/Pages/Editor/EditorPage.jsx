import React, { useState } from 'react';

const EditorPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    return (
        <div>
            <h1>EDITOR</h1>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {selectedImage && <img src={selectedImage} alt="Selected Image" />}
        </div>
    );
};

export default EditorPage;
