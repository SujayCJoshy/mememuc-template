import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextOptions from './editorTextOptions';

const TextEditor = ({
  handleTextOptionsChange,
  handleImageSizeOption,
  handleSaveImage,
  handleCanvasColor,
  handleCanvasSize
}) => {
  const [textOptions, setTextOptions] = useState([{
    text: '',
    fontFamily: '',
    textColor: '',
    textSize: '',
    textX: '',
    textY: '',
    outlineColor: '',
    outlineThickness: '',
    imageSizeOption: '',
  }]);



  const [showNameInput, setShowNameInput] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [showCanvasSizeInputs, setShowCanvasSizeInputs] = useState(false);
  const [canvasSizeInputs, setCanvasSizeInputs] = useState({
    width: 700, // Default width
    height: 700, // Default height
  });

  useEffect(() => {
    console.log("Running2", textOptions)
    handleTextOptionsChange(textOptions);
  }, [textOptions, handleTextOptionsChange]);

  useEffect(() => {
    handleCanvasSize(canvasSizeInputs.height,canvasSizeInputs.width);
    console.log("size changed", canvasSizeInputs)
  },[handleCanvasSize, canvasSizeInputs]);


  const addTextOption = () => {
    const newTextOption = {
      text: '',
      fontFamily: '',
      textColor: '',
      textSize: '',
      textX: '',
      textY: '',
      outlineColor: '',
      outlineThickness: '',
      imageSizeOption: '',
    };
    setTextOptions([...textOptions, newTextOption]);
  };

  const deleteTextOption = (index) => {
    const newTextOptions = textOptions.filter((_, idx) => idx !== index);
    setTextOptions(newTextOptions);
  };

  const handleChange = (index, name, value) => {
    const updatedOptions = textOptions.map((option, idx) => {
      if (idx === index) {
        return { ...option, [name]: value };
      }
      return option;
    });
    setTextOptions(updatedOptions);
  };

  // Function to update canvas size input values
  const handleCanvasSizeInput = (e) => {
    const { name, value } = e.target;
    setCanvasSizeInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const initiateSaveTemplate = () => {
    setShowNameInput(true);
  };

  const toggleCanvasSizeInputs = () => {
    setShowCanvasSizeInputs(!showCanvasSizeInputs);
  };

  const confirmSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please provide a name for the template.');
      return;
    }

    // Include textOptions in templateData
    const templateData = {
      name: templateName,
      textOptions, // Now saving all text options
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log(templateData);
      const response = await axios.post('http://localhost:3000/templates', templateData, config);
      console.log('Template saved successfully:', response.data);
      alert('Template saved successfully');
      setShowNameInput(false);
      setTemplateName('');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "40px", marginTop: "20px" }}>
      {textOptions.map((option, index) => (
        <div key={index}>
          <TextOptions
            option={option}
            handleChange={(name, value) => handleChange(index, name, value)}
          />
          <button onClick={() => deleteTextOption(index)}>Delete Text Option</button>
        </div>
      ))}
      
      <button onClick={addTextOption}>Add Text Option</button>
      <br/><br/>
      <br/><br/>
      <button onClick={handleCanvasColor}>Canvas Color</button>
      <button onClick={toggleCanvasSizeInputs}>Canvas Size</button>
      {showCanvasSizeInputs && (
        <div>
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={canvasSizeInputs.width}
            onChange={handleCanvasSizeInput}
          />
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={canvasSizeInputs.height}
            onChange={handleCanvasSizeInput}
          />
        </div>
      )}
      <br/><br/>
      <br/><br/>
      <button onClick={handleSaveImage}>Save Image</button>
      {showNameInput ? (
        <>
          <label htmlFor="templateNameInput">Template Name:</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            autoFocus
          />
          <button onClick={confirmSaveTemplate}>Confirm Save</button>
        </>
      ) : (
        <button onClick={initiateSaveTemplate}>Save Template</button>
      )}
    </div>
  );
};

export default TextEditor;
