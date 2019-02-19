var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var campground = require('./models/campground');

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3",{useNewUrlParser : true});



// campground.create(
// 	{ name : "Granite Hill",
// 	image : "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_960.jpg&user=Pexels",
// 	description : "This is Granite Hill. No Bathrooms. Beautiful Sky. No Water."
// 	}, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else {
// 		console.log("Newly Created campground");
// 		console.log(campground);
// 	}
// });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/",function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	campground.findById(req.params.id, function(err, foundcampground){
		if(err){
			console.log(err);
		}
		else {
			res.render("show", {campground:foundcampground});
		}
	});

});



app.listen(3000, 'localhost',function(){
	console.log("Server has Started on PORT 3000");
});




