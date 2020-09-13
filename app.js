var mongoose 			  = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");
var express 			  = require("express");
var passport 			  = require("passport");
var bodyParser 			  = require("body-parser");
var localStrategy 		  = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


var app     = express();

var User                  = require("./models/user");


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"Rusty is the best and cutest dog in the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//================================================
//Routes
//================================================

app.get("/",function(req,res) {

	// body...
	res.render("home");
});

app.get("/secret",function(req,res)
{
	res.render("secret");
});


//show signup form
app.get("/register",function(req,res) {
	res.render("register");
});

//handling user signup
app.post("/register",function(req,res) {
	User.register(new User({username:req.body.username}),req.body.password,function(err,user) {
		if(err)
		{
			console.log(err);
			return res.render("register");
		}	
		passport.authenticate("local")(req,res,function() {
			res.redirect("/secret");
		})
	});
});


//login routes
app.get("/login",function(req,res) {
	res.render("login");
});


//middleware
app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res) {
	
});
app.listen(3000,'localhost',function() {
	// body...
	console.log("Listening to port"+3000);
	console.log("Authdemo Local Server has Started");

});