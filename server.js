const express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    app = express(),
    portNumber = 3000;
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
    app.get("/about",(req,res)=>{
        res.render("about");
    });




    app.listen(portNumber, function() {
        console.log(`DRICT listening to port - ${portNumber}`);
    });
    