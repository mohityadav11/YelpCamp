
var campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
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

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					res.redirect("back");
				}
				else {
						if(foundComment.author.id.equals(req.user.id)){
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

middlewareObj.isLoggedin = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;