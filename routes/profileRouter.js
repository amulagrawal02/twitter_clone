const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

router.get("/profile", isLoggedIn, (req, res) => {
  const payLoad = {
    user: req.user,
    displayName: req.user.firstName + " " + req.user.lastName,
  };
  console.log(payLoad);

  res.render("./partials/profile.ejs", { payLoad });
});

router.get("/profile/:userName", isLoggedIn, async (req, res) => {
  const userData = await User.findOne({ username: req.params.userName });
  const payLoad = {
    user: userData,
    displayName: userData.firstName + " " + userData.lastName,
  };

  res.render("./partials/profile.ejs", { payLoad });
});

router.get("/profile/Liked/:profileId", isLoggedIn, async (req, res) => {
  const data = await User.findById(req.params.profileId);
  res.status(200).json(data);
});

module.exports = router;
