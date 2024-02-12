// TextEditor.js
import React from "react";

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
    </div>
  );
};

export default TextEditor;
