var mongoose = require('mongoose');
var campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
	{ name : "Cloud's Rest",
	 image : "https://www.photosforclass.com/download/pixabay-1208201?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f0c47ca5e9b4b0_960.jpg&user=Free-Photos",
	 description : "blah blah blah"
	},
	{ name : "Desert Mesa",
	 image : "https://www.photosforclass.com/download/flickr-2164766085",
	 description : "blah blah blah"
	},
	{ name : "Canyon Floor",
	 image : "https://www.photosforclass.com/download/flickr-9580653400",
	 description : "blah blah blah"
	}
]

function seedDB(){
	campground.remove(function(err){
		if(err){
			console.log(err);
		}
		else {
			console.log("removed campgrounds!");
		}
		data.forEach(function(seed){
		campground.create(seed,function(err,campground){
			if(err){
				console.log(err);
			}
			else{
				console.log("Added");
				Comment.create(
				{
					text : "This place is great!",
					author : "Homer"
				},function(err,comment){
					if(err){
						console.log(err);
					}
					else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");	
					}
					
				});
			}
		})
	});
	});


}

module.exports = seedDB;