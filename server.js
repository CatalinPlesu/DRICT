const express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    app = express();
    const message = require("./models/messages");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/drict", {
	useNewUrlParser    : true,
	useFindAndModify   : false,
	useCreateIndex     : true,
	useUnifiedTopology : true
});
    app.use(express.static(__dirname + "/public"));

    app.get("/",(req,res)=>{
        message.find({}, (err, msg) => {
            if (err) throw err;
            res.render("index",{msg:msg});
        });
    
    });
    app.post("/",(req,res)=>{
        message.create({
            name: "anonim",
            text:req.body.text
        })
        res.redirect("/");
    });
    app.get("/lgoin",(req,res)=>{
        res.render("login");
    });
    app.get("/signup",(req,res)=>{
        res.render("signup");
    });
app.post("/login", (req, res) => {
        console.log("login")
        res.redirect("/");
    });
    app.post("/signup",(req,res)=>{
        console.log("signup");
        res.redirect("/");
    });




const port = 3000;
    app.listen(port, function() {
        console.log(`DRICT listening to port - ${port}`);
    });
    