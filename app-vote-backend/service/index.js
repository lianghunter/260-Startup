const jwt = require('jsonwebtoken');
const axios = require('axios');
const { AccessError, InputError } = require('../service/error');
const { User, Vote } = require('../model');
const JWT_SECRET = 'thedogwastheceo';

/**
 * Token vailidation
 * @param {*} authorization 
 * @returns 
 */
const getUserFromAuthorization = async (authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { username, } = jwt.verify(token, JWT_SECRET);
    // query database
    const user = await User.findOne({ username });
    if (!user) {
      throw new AccessError('Invalid token');
    }
    return user.username;
  } catch {
    throw new AccessError('Invalid token');
  }
};

/**
 * User login
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
const login = (username, password) => new Promise(async (resolve, reject) => {
  const user = await User.findOne({ username });
  // console.log('user: ', user, username);
  if (user && user.password === password) {
    resolve({
      token: jwt.sign({ username, }, JWT_SECRET, { algorithm: 'HS256', }),
      username
    });
  }
  reject(new InputError('Invalid username or password'));
});

/**
 * Add account
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
const register = (username, password) => new Promise(async (resolve, reject) => {
  const user = await User.findOne({ username });
  if (user) {
    return reject(new InputError('Username address already registered'));
  }
  const insertUser = { username, password };
  await User.insertMany([insertUser]);
  resolve({
    token: jwt.sign({ username, }, JWT_SECRET, { algorithm: 'HS256', }),
    username,
  });
});

/**
 * Add vote
 * @param {*} brandName 
 * @param {*} dislike 
 * @param {*} like 
 * @param {*} strongLike 
 * @returns 
 */
const addOrUpdateVote = (votes) => new Promise(async(resolve, reject) => {
  try {
    for (const v of votes) {
      if (!v.brandName) {
        continue;
      }
      if (!v.dislike && !v.like && !v.strongLike) {
        continue;
      }
      const vote = await Vote.findOne({ brandName: v.brandName });
      if (!vote) {
        let insertVote = { brandName: v.brandName };
        if (v.dislike) {
          insertVote.dislike = 1;
        }
        if (v.like) {
          insertVote.like = 1;
        }
        if (v.strongLike) {
          insertVote.strongLike = 1;
        }
        await Vote.insertMany([insertVote]);
      } else {
        let updateItems = null;
        if (v.dislike) {
          updateItems = {
            $inc: {
              dislike: 1
            }
          }
        } else if (v.like) {
          updateItems = {
            $inc: {
              like: 1
            }
          }
        } else if (v.strongLike) {
          updateItems = {
            $inc: {
              strongLike: 1
            }
          }
        }
        await Vote.updateOne({brandName: v.brandName}, updateItems);
      }
    }
    resolve({code: 200, msg: 'Ok'});
  } catch (error) {
    reject(error);
  }
});

/**
 * Get all the votes
 * @returns 
 */
const getVotes = () => new Promise(async (resolve, reject) => {
  try {
    const votes = await Vote.find();
    resolve(votes);
  } catch (error) {
    reject(error);
  }
});

/**
 * This is call third party api to get random animal picture
 * https://dog.ceo/api/breeds/image/random
 */
const getRandomPic = () => new Promise(async (resolve, reject) => {
  try {
    axios.get('https://dog.ceo/api/breeds/image/random').then(res => {
      resolve(res.data);
    })
  } catch (error) {
    reject(error);
  }
});

module.exports = {
  getUserFromAuthorization,
  login,
  register,
  addOrUpdateVote,
  getVotes,
  getRandomPic
};