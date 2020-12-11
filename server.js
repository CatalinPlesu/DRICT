const express = require("express"),
    mongoose = require("mongoose"),
    app = express(),
    portNumber = 3000;

    app.set("view engine", "ejs");


    app.get("/",(req,res)=>{
        res.render("index");
    });




    app.listen(portNumber, function() {
        console.log(`DRICT listening to port - ${portNumber}`);
    });
    