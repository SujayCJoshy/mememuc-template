// DrawingCanvas.js
import React, { useRef, useEffect, useState } from 'react';
import './editorImagePicker.css'; // Assuming you have this CSS file for styles

const DrawingCanvas = ({ handleClose, onSelectImage }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Function to calculate mouse position on canvas
    const getMousePos = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = "#FFFFFF"; // Set canvas background to white
        context.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with white background

        const startDrawing = (event) => {
            const pos = getMousePos(canvas, event);
            context.beginPath();
            context.moveTo(pos.x, pos.y);
            setIsDrawing(true);
        };

        const draw = (event) => {
            if (!isDrawing) return;
            const pos = getMousePos(canvas, event);
            context.lineTo(pos.x, pos.y);
            context.stroke();
        };

        const stopDrawing = () => {
            context.closePath();
            setIsDrawing(false);
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, [isDrawing]);

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const imageDataUrl = canvas.toDataURL('image/png');
        onSelectImage(imageDataUrl);
        handleClose();
    };

    return (
        <div>
            <div className="image-gallery-backdrop" onClick={handleClose}></div>
            <div className="image-gallery-popup">
                <canvas ref={canvasRef} width={640} height={480} style={{border: '1px solid black', backgroundColor: 'white'}}></canvas>
                <button onClick={saveDrawing}>Save Drawing</button>
                <button onClick={handleClose} style={{ position: 'absolute', top: 0, right: 0 }}>Close</button>
            </div>
        </div>
    );
};

export default DrawingCanvas;
