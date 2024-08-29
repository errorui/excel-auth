const User = require('../models/userModel');
const { generateToken } = require('../utils/generatetoken');


// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ err: 'Please enter all the fields' });
    return;
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ err: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Expires in 2 days
        sameSite: 'none', // Ensures cross-site request forgery (CSRF) protection
      });

      req.user = user;
      return res.status(201).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } else {
      return res.status(400).json({ err: 'User creation failed' });
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

// Authenticate User
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Expires in 2 days
        sameSite: 'none',
      });

      req.user = user;
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ err: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

module.exports = { registerUser, authUser };
