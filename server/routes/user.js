const express = require("express");
const router = express.Router();

const verifyMiddleware = require("../middlewares/VerifyToken");

const userController = require("../controllers/UserController");

router.delete(
  "/delete/:id",
  verifyMiddleware.verifyAndUserAuthorization,
  userController.deleteUser
);

router.put(
  "/update/:id",
  verifyMiddleware.verifyAndUserAuthorization,
  userController.updateUser
);

router.get(
  "/detail/:id",
  verifyMiddleware.verifyAndUserAuthorization,
  userController.detailUser
);
router.get(
  "/users",
  verifyMiddleware.verifyAccessToken,
  userController.getAllUser
);

module.exports = router;
