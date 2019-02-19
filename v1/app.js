var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [
			{ name : "Salmon Creek",image : "https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa4edb1bf_960.jpg&user=Pexels"},
			{ name : "Granite Hill",image : "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_960.jpg&user=Pexels"},
			{ name : "Mountain Goat rest",image : "https://www.photosforclass.com/download/flickr-225912054"},
			{ name : "Salmon Creek",image : "https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa4edb1bf_960.jpg&user=Pexels"},
			{ name : "Granite Hill",image : "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_960.jpg&user=Pexels"},
			{ name : "Mountain Goat rest",image : "https://www.photosforclass.com/download/flickr-225912054"},
			{ name : "Salmon Creek",image : "https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa4edb1bf_960.jpg&user=Pexels"},
			{ name : "Granite Hill",image : "https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f7c57aa5e9b1b9_960.jpg&user=Pexels"},
			{ name : "Mountain Goat rest",image : "https://www.photosforclass.com/download/flickr-225912054"}
		]

app.get("/",function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(3000, 'localhost',function(){
	console.log("Server has Started on PORT 3000");
});