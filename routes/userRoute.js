const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers
} = require("../controllers/usercontrollers");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

// Register User
router.route("/signup").post(registerUser);

// Authenticate User
router.post("/login", authUser);

// Get All Users (protected route)
router.get("/users", protect, getAllUsers);

// Get User Info
router.get("/user", protect, (req, res) => {
  res.send(req.user);
});

// Logout User
router.route("/logout").get(protect, (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    sameSite: "none",
  });
  return res.send("logout successful");
});

module.exports = router;
