const express = require('express');
const router = express.Router();
const {
  InputError,
  AccessError
} = require('../service/error');
const {
  getUserFromAuthorization,
  login,
  register,
  addOrUpdateVote,
  getVotes,
  getRandomPic
} = require('../service');

/**
 * Catch error
 * @param {*} fn 
 * @returns 
 */
const catchErrors = fn => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({
        error: err.message,
      });
    } else if (err instanceof AccessError) {
      console.log('error: ', err);
      res.status(403).send({
        error: err.message,
      });
    } else {
      console.log(err);
      res.status(500).send({
        error: 'A system error ocurred',
      });
    }
  }
};

/**
 * Authentication check
 * @param {*} fn 
 * @returns 
 */
const authed = fn => async (req, res) => {
  const username = await getUserFromAuthorization(req.header('Authorization'));
  console.log('username: ', username);
  await fn(req, res, username);
};

router.post('/login', catchErrors(async (req, res) => {
  const {
    username,
    password,
  } = req.body;
  return res.json(await login(username, password));
}));

router.post('/register', catchErrors(async (req, res) => {
  const {
    username,
    password
  } = req.body;
  return res.json(await register(username, password));
}));

router.post('/votes', catchErrors(authed(async (req, res, username) => {
  console.log(req.body.votes);
  const result = await addOrUpdateVote(req.body.votes);
  return res.json(result)
})));

router.get("/votes", catchErrors(authed(async (req, res, username) => {
  return res.json(await getVotes());
})));

router.get("/randomPicture", catchErrors(async (req, res) => {
  return res.json(await getRandomPic());
}));

module.exports = router;