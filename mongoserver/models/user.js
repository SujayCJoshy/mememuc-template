const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true },
  userid: { type: String, unique: true, required: true },
  useremail: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // For authentication
  memes: [{ type: Schema.Types.ObjectId, ref: 'Meme' }], // Created memes
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // User comments
  likes: [{ type: Schema.Types.ObjectId, ref: 'Meme' }], // Memes liked by the user
  isPrivate: { type: Boolean, default: false }, // Privacy setting
}, { timestamps: true });

const UserModel = model('User', userSchema);
