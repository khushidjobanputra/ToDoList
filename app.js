
const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = ["Buy food", "cook food", "eat food"];
let workItems = [];

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req,res){
  
    let day = date.getDate();
    res.render("list", {ListTitle: day, newListItems: items});
/*
    let today = new Date();
    //var currentDay = today.getDay();
    //var day = "";

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {ListTitle: day, newListItems: items});

    if(today.getDay()==6 || today.getDay()==0){
        day="Weekend";
        res.sendFile(__dirname + '/weekend.html');
    }
    else{
        day = "Weekday";
        res.sendFile(__dirname + '/weekday.html');
    }

    switch(currentDay){
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
*/    
})

app.post("/", function(req, res){
 
    let item = req.body.newItem;
    console.log(req.body);

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function(req,res){
    res.render("list", {ListTitle:"Work List", newListItems: workItems});
})

app.post("/work", function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
}) 