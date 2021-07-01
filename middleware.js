const isLoggedIn = (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect("/login");
  }
  next();
};

module.exports = {
  isLoggedIn,
};
