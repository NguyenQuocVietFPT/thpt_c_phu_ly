const jwt = require("jsonwebtoken");

const VerifyToken = {
  //@desc: Verify token
  //@access: Public
  verifyAccessToken: (req, res, next) => {
    //Get token from header
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    ///Check token is valid
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    try {
      //Get data from token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.userId = decoded.userId;
      req.userRole = decoded.userRole;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Authorization failed",
        error: err.message,
      });
    }
  },

  //@desc: Verify token and user authorization
  //@access: Public
  verifyAndUserAuthorization: (req, res, next) => {
    //Callback verifyAccessToken method
    VerifyToken.verifyAccessToken(req, res, () => {
      //Check user role
      if (req.userId === req.params.id || req.userRole === "admin") {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "You don't allowed to do this",
        });
      }
    });
  },

  //@desc: Verify token and admin authorization
  //@access: Public
  verifyAndAdminAuthorization: (req, res, next) => {
    //Callback verifyAccessToken method
    VerifyToken.verifyAccessToken(req, res, () => {
      //Check user role
      if (req.userRole === "admin") {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "You don't allowed to do this",
        });
      }
    });
  },
};

module.exports = VerifyToken;
