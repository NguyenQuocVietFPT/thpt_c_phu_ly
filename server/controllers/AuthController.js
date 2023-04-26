const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const AuthController = {
  // @desc: Generate access token for the authenticated
  generateAccesToken: (user) => {
    return jwt.sign(
      {
        userId: user._id,
        userRole: user.role,
      },
      process.env.JWT_TOKEN
    );
  },

  // @route: [POST] api/auth/register
  // @desc: Register a new user
  resigter: async (req, res) => {
    const { username, password, email } = req.body;
    //Check username and password is null
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }
    try {
      //Check username is existed
      const checkUser = await User.findOne({
        username,
      });
      if (checkUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      //Hash password
      const hashedPassword = await argon2.hash(password);
      const newUser = await new User({
        username,
        password: hashedPassword,
        email,
      });
      //Save new user to mongodb
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        savedUser: newUser,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Register failed",
        error: err.message,
      });
    }
  },

  // @route: [POST] api/auth/login
  // @desc: Login user
  login: async (req, res) => {
    const { username, password } = req.body;
    //Check username and password is null
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }
    try {
      //Check username is correct
      const userLogin = await User.findOne({
        username,
      });
      if (!userLogin) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      //Check password is correct
      const comparePassword = await argon2.verify(userLogin.password, password);
      if (!comparePassword) {
        return res.status(400).json({
          success: false,
          message: "Wrong password",
        });
      }

      if (userLogin && comparePassword) {
        const accessToken = AuthController.generateAccesToken(userLogin);
        return res.status(200).json({
          success: true,
          message: "Logged in successfully",
          token: accessToken,
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Login failed",
        error: err.message,
      });
    }
  },
  // @route: [POST] api/auth/logout
  // @desc: Login user
  logout: async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Log out failed",
        error: err.message,
      });
    }
  },
};

module.exports = AuthController;
