const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    portNumber = 3000;

    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));

    app.get("/",(req,res)=>{
        res.render("index");
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
    