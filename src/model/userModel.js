const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Guest',
    enum: ["Admin", "User", "Guest"]
  },
 
});

const User = mongoose.model('user', userSchema);

module.exports = User;