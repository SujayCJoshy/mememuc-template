import React, { useRef, useEffect } from 'react';

const Canvas = ({ canvasRef, selectedImage, text, textColor, textSize, textX, textY, canvasColor, imageSizeOption, outlineColor, outlineThickness, fontFamily }) => {

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (selectedImage) {
            const image = new Image();
            image.src = selectedImage;
            image.onload = () => {
                // Adjust canvas size to match the image size
                let scale = Math.min(700 / image.width, 700 / image.height);
                canvas.width = image.width * scale;
                canvas.height = image.height * scale;

                ctx.fillStyle = canvasColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                let imageWidth, imageHeight;
                if (imageSizeOption === 'cover') {
                    // Cover the whole canvas
                    imageWidth = canvas.width;
                    imageHeight = canvas.height;
                } else {
                    // Or maintain the original size (or any logic you prefer)
                    imageWidth = image.width;
                    imageHeight = image.height;
                }

                const imageX = (canvas.width - imageWidth) / 2;
                const imageY = (canvas.height - imageHeight) / 2;
                ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
                
                // Update text drawing to account for new canvas size
                ctx.font = `${textSize}px ${fontFamily}`;
                ctx.fillStyle = textColor;
                ctx.shadowColor = outlineColor;
                ctx.shadowBlur = outlineThickness;
                // Ensure text positioning is still valid with new canvas size
                ctx.fillText(text, textX * scale, textY * scale); // Adjust text position if scaling
            };
        } else {
            // Default canvas size if no image is selected
            canvas.width = 700;
            canvas.height = 700;
            ctx.fillStyle = canvasColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [selectedImage, text, textColor, textSize, textX, textY, canvasColor, imageSizeOption, outlineColor, outlineThickness, fontFamily, canvasRef]);

    return <canvas ref={canvasRef} style={{ marginTop: '10px',background: 'grey' }} />;
};

export default Canvas;
