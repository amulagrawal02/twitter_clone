const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");

// to connect mongoose
mongoose
  .connect("mongodb://localhost:27017/twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Db Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

// routers
app.get("/", (req, res) => {
  res.render("home");
});

// to Start server
app.listen(port, () => {
  console.log(`Server start at ${port}`);
});
