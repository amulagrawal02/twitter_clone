const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const flash = require("connect-flash");
const { isLoggedIn } = require("./middleware");

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
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());

const authRouter = require("./routes/authRouter");
const postApiRouter = require("./routes/api/post");
const profileRouter = require("./routes/profileRouter");

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
// initialize passport to use in our application
app.use(passport.initialize());
// use middleware to use session
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRouter);
app.use(postApiRouter);
app.use(profileRouter);

// routers
app.get("/", isLoggedIn, (req, res) => {
  res.render("layouts/main-layout");
});

// to Start server
app.listen(port, (req, res) => {
  console.log(`Server start at ${port}`);
});
