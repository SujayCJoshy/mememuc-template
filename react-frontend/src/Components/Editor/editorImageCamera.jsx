import React, { useRef, useEffect, useState } from 'react';
import './editorImageCamera.css';

const Camera = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!stream) {
      enableStream();
    } else {
      return () => {
        stream.getTracks().forEach(track => track.stop());
      };
    }
  }, [stream]);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      onCapture(url); // Pass the URL to the parent component
    });
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    onClose(); // Invoke the onClose prop function to handle closing
  };

  return (
    <div className="camera-popup">
      <video ref={videoRef} autoPlay playsInline></video>
      <button onClick={handleCapture}>Capture</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Camera;
