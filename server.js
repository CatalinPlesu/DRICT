const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/drict", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const message = require("./models/messages");
const user = require("./models/users");

const passport = require("passport");
const passport_local = require("passport-local");
const passport_local_mongoose = require("passport-local-mongoose");

app.use(
  require("express-session")({
    secret: "random secret",
    resave: false,
    saveUninitialized: false
  })
);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passport_local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//================
//ROUTES
//================
app.get("/", (req, res) => {
  message.find({}, (err, msg) => {
    if (err) throw err;
    res.render("index", { msg: msg });
  });
});
app.post("/", (req, res) => {
  message.create({
    name: "anonim",
    text: req.body.text
  });
  res.redirect("/");
});

//REGISTER routes
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  user.register(
    new user({
      username: req.body.username
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/users");
      });
    }
  );
});
//LOGIN routes
app.get("/login", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);
//LOGOUT routes
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
//USERS TABLE
app.get("/users", isLoggedIn, (req, res) => {
  user.find({}, (err, usr) => {
    if (err) throw err;
    res.render("users", { usr: usr });
  });
});
//middleware to check if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

const port = 3000;
app.listen(port, function () {
  console.log(`DRICT listening to port - ${port}`);
});
