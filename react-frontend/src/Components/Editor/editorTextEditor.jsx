// TextEditor.js
import React from "react";
import axios from 'axios';
import { useState} from "react";

const TextEditor = ({
  text,
  fontFamily,
  textColor,
  textSize,
  textX,
  textY,
  outlineColor,
  outlineThickness,
  imageSizeOption,
  handleImageSizeOption,
  handleTextChange,
  handleFontFamilyChange,
  handleTextColorChange,
  handleTextSizeChange,
  handleTextXChange,
  handleTextYChange,
  handleOutlineColorChange,
  handleOutlineThicknessChange,
  handleClearText,
  handleSaveImage,
  handleCanvasColor,
}) => {

  const [showNameInput, setShowNameInput] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const initiateSaveTemplate = () => {
    setShowNameInput(true);
  };

  const confirmSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert('Please provide a name for the template.');
      return;
    }

    const templateData = {
      name: templateName,
      text,
      fontFamily,
      textColor,
      textSize,
      textX,
      textY,
      outlineColor,
      outlineThickness,
      imageSizeOption,
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
      setShowNameInput(false); // Optionally hide the input again or reset state
      setTemplateName(''); // Reset template name
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "40px", marginTop: "20px" }}>
      <h2 style={{ fontFamily: "Arial" }}>Add/Edit Text</h2>
      <select value={imageSizeOption} onChange={handleImageSizeOption}>
        <option value="cover">Cover (100%)</option>
        <option value="eightyPercent">80% of Canvas</option>
      </select>
      <label htmlFor="textInput">Text:</label>
      <input type="text" value={text} onChange={handleTextChange} />
      <br />
      <label htmlFor="fontFamilyInput">Font Family:</label>
      <select
        id="fontFamilyInput"
        value={fontFamily}
        onChange={handleFontFamilyChange}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
        <option value="Anton">Anton</option>
      </select>
      <br />
      <label htmlFor="textColorInput">Text Color:</label>
      <input type="color" value={textColor} onChange={handleTextColorChange} />
      <br />
      <label htmlFor="textSizeInput">Text Size:</label>
      <input type="number" value={textSize} onChange={handleTextSizeChange} />
      <br />
      <label htmlFor="textXInput">Text X Position:</label>
      <input type="number" value={textX} onChange={handleTextXChange} />
      <br />
      <label htmlFor="textYInput">Text Y Position:</label>
      <input type="number" value={textY} onChange={handleTextYChange} />
      <br />
      <label htmlFor="outlineColorInput">Outline Color:</label>
      <input
        type="color"
        value={outlineColor}
        onChange={handleOutlineColorChange}
      />
      <br />
      <label htmlFor="outlineThicknessInput">Outline Thickness:</label>
      <input
        type="number"
        value={outlineThickness}
        onChange={handleOutlineThicknessChange}
      />
      <br />
      <button onClick={handleCanvasColor}>Canvas Color</button>
      <button onClick={handleClearText}>Clear Text</button>
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
