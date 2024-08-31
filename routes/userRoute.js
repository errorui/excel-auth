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
/*
[
    {
        "_id": "66cf7c265e532b2919c279ef",
        "username": "testuser",
        "email": "testuser@example.com",
        "createdAt": "2024-08-28T19:36:06.990Z",
        "updatedAt": "2024-08-28T19:36:06.990Z",
        "__v": 0,
        "projects": []
    },
    {
        "_id": "66d09c45923e4bf3e81576a5",
        "username": "raj",
        "email": "rajraman@gmail.com",
        "createdAt": "2024-08-29T16:05:25.044Z",
        "updatedAt": "2024-08-29T16:05:25.044Z",
        "__v": 0,
        "projects": []
    },
    {
        "_id": "66d143c16b5577585850a1a2",
        "username": "dev",
        "email": "dev@gmail.com",
        "createdAt": "2024-08-30T04:00:01.863Z",
        "updatedAt": "2024-08-30T04:00:01.863Z",
        "__v": 0,
        "projects": []
    },
    {
        "_id": "66d147685778a7a87061187c",
        "username": "dev1",
        "email": "dev1@gmail.com",
        "createdAt": "2024-08-30T04:15:36.571Z",
        "updatedAt": "2024-08-30T04:15:36.571Z",
        "__v": 0,
        "projects": []
    },
    {
        "_id": "66d20db0fd9fb228aa403a34",
        "username": "dev2",
        "email": "dev2@gmail.com",
        "createdAt": "2024-08-30T18:21:36.421Z",
        "updatedAt": "2024-08-30T18:21:36.421Z",
        "__v": 0,
        "projects": []
    },
    {
        "_id": "66d357cdd14c88d35cd7d6d8",
        "username": "Mohit",
        "email": "Mohit@gmail.com",
        "projects": [],
        "createdAt": "2024-08-31T17:50:05.705Z",
        "updatedAt": "2024-08-31T17:50:05.705Z",
        "__v": 0
    }
]
*/ 