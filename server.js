const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/drict", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const message = require("./models/messages");
const user = require("./models/users");

const passport = require("passport");
const passport_local = require("passport-local");
const passport_local_mongoose = require("passport-local-mongoose");

app.use(
  require("express-session")({
    secret: "random secret => have no clue what does",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passport_local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

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
  if (!res.locals.currentUser) {
    message.create({
      name: "anonim",
      text: req.body.text,
    });
  } else {
    message.create({
      name: res.locals.currentUser.username,
      text: req.body.text,
    });
  }
  res.redirect("/");
});

//REGISTER routes
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  user.register(
    new user({
      username: req.body.username,
      avatar: req.body.avatar,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
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
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);
//LOGOUT routes
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
// AJAX requests test
app.get("/ajax", (req, res) => {
  message.find({}, (err, msg) => {
    if (err) throw err;
    res.send(JSON.stringify(msg));
  });
});
app.post("/ajax", (req, res) => {
  if (!res.locals.currentUser) {
    message.create({
      name: req.body.anonim,
      uid: null,
      uav: req.body.avatar,
      text: req.body.text,
    });
  } else {
    message.create({
      name: res.locals.currentUser.username,
      uid: res.locals.currentUser._id,
      uav: res.locals.currentUser.avatar,
      text: req.body.text,
    });
  }
  res.sendStatus(200);
});
//AUXILIAR
//USERS TABLE
app.get("/users", isLoggedIn, (req, res) => {
  user.find({}, (err, usr) => {
    if (err) throw err;
    res.render("users", { usr: usr });
  });
});
//reset messages
app.get("/dropM", (req, res) => {
  mongoose.connection.collection("messages").drop();
  res.redirect("/");
});
app.get("/dropU", (req, res) => {
  mongoose.connection.collection("users").drop();
  res.redirect("/");
});
//middleware to check if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

const port = 3333;
app.listen(port, () => {
  console.log(`DRICT listening to port - ${port}`);
});
