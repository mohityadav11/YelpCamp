var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var campground = require('./models/campground');
var Comment = require('./models/comment');
var User  = require("./models/user");
var seedDB = require('./seeds')

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6",{useNewUrlParser : true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require('express-session')({
	secret : "Its a Secret!",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.get("/",function(req, res){
	res.render("landing");
});


app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register",function(req, res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			 res.redirect("/campgrounds");
		});
	});	
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login",passport.authenticate("local", 
	{
	successRedirect : "/campgrounds", 
	failureRedirect : "/login"
	}),function(req, res){

});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, 'localhost',function(){
	console.log("Server has Started on PORT 3000");
});




