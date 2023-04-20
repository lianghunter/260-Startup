const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/vote'
// const uri = 'mongodb+srv://dh21421214:nI4SbwaHNdTUxrdR@cluster0.5qspjbo.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true});

// users table
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
}, {
  collection: 'users'
});
const User = mongoose.model('User', userSchema);

// vote table
const voteSchema = new mongoose.Schema({
  brandName: String,
  dislike: {
    type: Number,
    min: 0,
    default: 0
  },
  like: {
    type: Number,
    min: 0,
    default: 0
  },
  strongLike: {
    type: Number,
    min: 0,
    default: 0
  },
});

const Vote = mongoose.model('Vote', voteSchema);

// commonjs 
module.exports = {
  User,
  Vote
};
