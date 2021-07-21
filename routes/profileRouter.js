const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/profile", (req, res) => {
  res.render("./partials/profile.ejs");
});

module.exports = router;
