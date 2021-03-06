
var express = require('express');
var router = express.Router({mergeParams : true});
var campground = require('../models/campground');
var Comment = require('../models/comment');

router.get("/new",isLoggedin,function(req,res){
	
	campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
		}
		else {
				res.render("comments/new", {campground : campground});
		}
	});

});

router.post("/",isLoggedin,function(req,res){
	campground.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else {
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else {
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

function isLoggedin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
