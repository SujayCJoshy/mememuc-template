const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    unique: true,
    required: true,
  },
  useremail: {
    type: String,
    unique: true,
    required: true,
  },
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
