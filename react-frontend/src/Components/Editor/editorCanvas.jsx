import React, { useEffect } from 'react';

const Canvas = ({ canvasRef, selectedImage, text, textColor, textSize, textX, textY, canvasColor, imageSizeOption, outlineColor, outlineThickness, fontFamily }) => {

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = 700;
        canvas.height = 700;

        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (selectedImage) {
            const image = new Image();
            image.src = selectedImage;
            image.onload = () => {
                // Calculate scale to maintain aspect ratio and fit within canvas dimensions
                let scale = Math.min(canvas.width / image.width, canvas.height / image.height);
                let imageWidth = image.width * scale;
                let imageHeight = image.height * scale;

                // Center the image on the canvas
                let imageX = (canvas.width - imageWidth) / 2;
                let imageY = (canvas.height - imageHeight) / 2;

                ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

                // Text settings
                ctx.font = `${textSize}px ${fontFamily}`;
                ctx.fillStyle = textColor;
                ctx.shadowColor = outlineColor;
                ctx.shadowBlur = outlineThickness;

                // Draw text - adjust position based on scale if needed
                ctx.fillText(text, textX * scale, textY * scale);
            };
        }
    }, [selectedImage, text, textColor, textSize, textX, textY, canvasColor, imageSizeOption, outlineColor, outlineThickness, fontFamily, canvasRef]);

    return <canvas ref={canvasRef} style={{ marginTop: '10px', background: 'grey' }} />;
};

export default Canvas;
