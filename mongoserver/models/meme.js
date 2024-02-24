const { Schema, model } = require('mongoose');

const memeSchema = new Schema({
  title: { type: String, required: true },
  topCaption: { type: String },
  bottomCaption: { type: String },
  template: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  views: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  isPrivate: { type: Boolean, default: false },
  likes: { type: Number, default: 0 }, // Number of likes
}, { timestamps: true });

const MemeModel = model('Meme', memeSchema);
