import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextOptions from './editorTextOptions';

const TextEditor = ({
  handleTextOptionsChange,
  handleImageSizeOption,
  handleSaveImage,
  handleCanvasColor,
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

  useEffect(() => {
    console.log("Running2", textOptions)
    handleTextOptionsChange(textOptions);
  }, [textOptions, handleTextOptionsChange]);


  const [showNameInput, setShowNameInput] = useState(false);
  const [templateName, setTemplateName] = useState('');

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

  const initiateSaveTemplate = () => {
    setShowNameInput(true);
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
      <button onClick={handleCanvasColor}>Canvas Color</button>
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
