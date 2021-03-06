
var express = require('express');
var router = express.Router();
var campground = require('../models/campground');

router.get("/", function(req, res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser : req.user});
		}
	});
});

router.post("/",isLoggedin,function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	}
	var newCampground = {name:name, image:image, description:desc, author : author}
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new",isLoggedin,function(req, res){
	res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
		if(err){
			console.log(err);
		}
		else {
			console.log(foundcampground);
			res.render("campgrounds/show", {campground:foundcampground});
		}
	});
});

router.get("/:id/edit",checkCampgroundOwnership, function(req,res){
		campground.findById(req.params.id, function(err, foundcampground){
		res.render("campgrounds/edit", {campground : foundcampground});	
		});
});

router.put("/:id",checkCampgroundOwnership,function(req, res){
	campground.findByIdAndUpdate(req.params.id , req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:id",checkCampgroundOwnership,function(req, res){
	campground.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

function isLoggedin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id, function(err, foundcampground){
				if(err){
					res.redirect("back");
				}
				else {
						if(foundcampground.author.id.equals(req.user.id)){
							next();
						}
						else {
							res.redirect("back");
						}		
				}
			});
	} else {
		res.redirect("back");
	}
}

module.exports = router;
