
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
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
