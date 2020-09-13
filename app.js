var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");
var app     = express();


app.set("view engine","ejs");


app.get("/",function(req,res) {

	// body...
	res.render("home");
});

app.get("/secret",function(req,res)
{
	res.render("secret");
})



app.listen(3000,'localhost',function() {
	// body...
	console.log("Listening to port"+3000);
	console.log("Authdemo Local Server has Started");

});