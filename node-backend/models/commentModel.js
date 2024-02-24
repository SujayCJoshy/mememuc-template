const { Schema, model, Types } = require('mongoose');

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const CommentModel = model('Comment', commentSchema);

module.exports = CommentModel;
