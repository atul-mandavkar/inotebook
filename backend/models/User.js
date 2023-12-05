const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('user', UserSchema);
User.createIndexes(); // For to make email unique we made indexes in schema model snd then export thtat schema
module.exports = User;