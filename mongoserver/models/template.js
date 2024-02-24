const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const TemplateModel = model('Template', templateSchema);

module.exports = TemplateModel;
