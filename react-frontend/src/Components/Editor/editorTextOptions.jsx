import React from 'react';

// Define font options outside of your component
const fontOptions = [
  "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
  "Georgia", "Garamond", "Courier New", "Brush Script MT", "Impact",
  "Comic Sans MS", "Consolas", "Palatino Linotype", "Lucida Sans Unicode",
  "Lucida Console", "Franklin Gothic Medium", "Algerian", "Arial Black",
  "Bookman Old Style",
];

const TextOptions = ({ option, handleChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <label>Text:</label>
        <input
          type="text"
          value={option.text || 'Sample Text'}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </div>
      <div>
        <label>Font Family:</label>
        <select
          value={option.fontFamily || 'Arial'}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Text Color:</label>
        <input
          type="color"
          value={option.textColor || '#000000'}
          onChange={(e) => handleChange("textColor", e.target.value)}
        />
      </div>
      <div>
        <label>Text Size:</label>
        <input
          type="number"
          value={option.textSize || '16'}
          onChange={(e) => handleChange("textSize", e.target.value)}
        />
      </div>
      <div>
        <label>X Position:</label>
        <input
          type="number"
          value={option.textX || '100'}
          onChange={(e) => handleChange("textX", e.target.value)}
        />
      </div>
      <div>
        <label>Y Position:</label>
        <input
          type="number"
          value={option.textY || '100'}
          onChange={(e) => handleChange("textY", e.target.value)}
        />
      </div>
      <div>
        <label>Outline Color:</label>
        <input
          type="color"
          value={option.outlineColor || '#FFFFFF'}
          onChange={(e) => handleChange("outlineColor", e.target.value)}
        />
      </div>
      <div>
        <label>Outline Thickness:</label>
        <input
          type="number"
          value={option.outlineThickness || '0'}
          onChange={(e) => handleChange("outlineThickness", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextOptions;
