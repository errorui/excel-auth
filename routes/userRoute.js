const express = require("express");
const {
  registerUser,
  authUser,

} = require("../controllers/usercontrollers");
const { protect } = require("../middlewares/authmiddleware");


const router = express.Router();

router
  .route("/signup")
  .post(registerUser)
  
router.post("/login", authUser);

router.get("/user", protect, (req, res) => {
  res.send(req.user);
});
router.route("/logout").get(protect, (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    sameSite: "none",
  });
  return res.send("logout succesfull");
});

module.exports = router;