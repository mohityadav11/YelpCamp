var mongoose = require('mongoose');
var campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
	{ name : "Cloud's Rest",
	 image : "https://www.photosforclass.com/download/flickr-7121863467",
	 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies mi id lectus vestibulum lobortis. Phasellus sodales, nibh at ullamcorper auctor, lorem neque ornare mauris, in laoreet urna ante eu sem. Sed lacus felis, facilisis at placerat finibus, varius ut enim. Suspendisse mollis dui ac libero porta pulvinar. Quisque urna nulla, aliquet a aliquam et, blandit eu diam. Mauris mollis, massa vitae mollis vulputate, felis nibh aliquet lacus, ut fermentum augue est sed felis. In fringilla, ex in aliquet molestie, ante diam pulvinar enim, auctor fringilla urna tortor vel erat. Cras consequat est nisl, ac commodo odio suscipit vitae. Praesent posuere nisl neque, et laoreet lectus "
	},
	{ name : "Desert Mesa",
	 image : "https://www.photosforclass.com/download/flickr-2164766085",
	 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies mi id lectus vestibulum lobortis. Phasellus sodales, nibh at ullamcorper auctor, lorem neque ornare mauris, in laoreet urna ante eu sem. Sed lacus felis, facilisis at placerat finibus, varius ut enim. Suspendisse mollis dui ac libero porta pulvinar. Quisque urna nulla, aliquet a aliquam et, blandit eu diam. Mauris mollis, massa vitae mollis vulputate, felis nibh aliquet lacus, ut fermentum augue est sed felis. In fringilla, ex in aliquet molestie, ante diam pulvinar enim, auctor fringilla urna tortor vel erat. Cras consequat est nisl, ac commodo odio suscipit vitae. Praesent posuere nisl neque, et laoreet lectus "
	},
	{ name : "Canyon Floor",
	 image : "https://www.photosforclass.com/download/flickr-9580653400",
	 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies mi id lectus vestibulum lobortis. Phasellus sodales, nibh at ullamcorper auctor, lorem neque ornare mauris, in laoreet urna ante eu sem. Sed lacus felis, facilisis at placerat finibus, varius ut enim. Suspendisse mollis dui ac libero porta pulvinar. Quisque urna nulla, aliquet a aliquam et, blandit eu diam. Mauris mollis, massa vitae mollis vulputate, felis nibh aliquet lacus, ut fermentum augue est sed felis. In fringilla, ex in aliquet molestie, ante diam pulvinar enim, auctor fringilla urna tortor vel erat. Cras consequat est nisl, ac commodo odio suscipit vitae. Praesent posuere nisl neque, et laoreet lectus "
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