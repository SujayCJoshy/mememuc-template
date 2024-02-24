const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }, // Number of likes for a comment
});

const CommentModel = model('Comment', commentSchema);
