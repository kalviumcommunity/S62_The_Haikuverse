const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type:String,
    required:true
  },
  poems: {
    type: [String],
    default: [],
  },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
