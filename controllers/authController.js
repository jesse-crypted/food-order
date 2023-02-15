const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  try {
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(
      res.status(404).json({
        status: 'fail',
        message: 'please provide email and password',
      })
    );
  }

  // check if user exist
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      res.status(401).json({
        statusCode: 401,
        status: 'fail',
        message: 'Incorrect email and password',
      })
    );
  }

  // console.log(user);

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
};
