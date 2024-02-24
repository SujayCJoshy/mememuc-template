const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  text: { type: String, required: false },
  fontFamily: { type: String, required: false },
  textColor: { type: String, required: false },
  textSize: { type: Number, required: false },
  textX: { type: Number, required: false },
  textY: { type: Number, required: false },
  outlineColor: { type: String, required: false },
  outlineThickness: { type: Number, required: false },
  imageSizeOption: { type: String, required: false },
  canvasColor: { type: String, required: false }, // Assuming you're storing a color for the canvas
});

const TemplateModel = model('Template', templateSchema);

module.exports = TemplateModel;
