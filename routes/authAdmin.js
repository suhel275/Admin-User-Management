const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// @route   GET api/authAdmin
// @desc    get logged in Admin
// @access  Private
router.get('/', auth, async (req, res) => {
  console.log('to load admin');
  try {
    const admin = await Admin.find().select('-password');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/authAdmin
// @desc    Auth admin and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'please include valid email').isEmail(),
    check('password', 'password is requierd').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      if (password !== admin.password) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
