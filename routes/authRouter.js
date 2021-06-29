const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("./auth/signup");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send(`It's working`);
});

module.exports = router;
