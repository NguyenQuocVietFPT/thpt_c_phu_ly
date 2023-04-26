const User = require("../models/User");
const argon2 = require("argon2");

const UserController = {
  // @route: [GET] api/user/users
  // @desc: Get all users
  getAllUser: async (req, res) => {
    try {
      //Get all users from mongodb
      const users = await User.find();
      res.status(200).json({
        success: true,
        UserList: users,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Get all users failed",
        error: err.message,
      });
    }
  },

  // @route: [GET] api/user/detail/:id
  // @desc: Get user's information by id
  detailUser: async (req, res) => {
    try {
      //Get user from mongodb by id
      const userDetail = await User.findById(req.params.id);
      res.status(200).json({
        success: true,
        userFound: userDetail,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Get detail failed",
        error: err.message,
      });
    }
  },

  // @route: [POST] api/user/update/:id
  // @desc: Update user's information by id
  updateUser: async (req, res) => {
    const { username, password, email, role } = req.body;
    //Check null values
    if (!username || !password || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    try {
      //Hash password
      const hashedPassword = await argon2.hash(password);
      let saveUser = {
        username,
        password: hashedPassword,
        email,
        role,
      };

      //Get user from mongodb by id and update
      const userDetail = await User.findByIdAndUpdate(req.params.id, saveUser, {
        new: true,
      });
      res.status(200).json({
        success: true,
        savedUser: saveUser,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Update failed",
        error: err.message,
      });
    }
  },

  // @route: [DELETE] api/user/delete/:id
  // @desc: Delete user's information by id
  deleteUser: async (req, res) => {
    try {
      //Get user from mongodb by id
      const userDetail = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete successfully",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Delete successfully",
        error: err.message,
      });
    }
  },
};

module.exports = UserController;
