app.get("/campgrounds", function(req, res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser : req.user});
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
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
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
