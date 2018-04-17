flickerPics = [];
place = "";


function fetchPics(position) {
	
	$.getJSON(`https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=${keys[1].key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&nojsoncallback=1`, function(data){		
		// console.log(data);
		place = data.places.place[0].name;
		place = place.split(",");
		place = `${place[1]},${place[2]}, city, building`;
		searchLocation()
	})
};

function searchLocation(){
	$.getJSON(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${keys[1].key}&text=${place}&format=json&nojsoncallback=1`, function(data){
		// console.log("Flicker incoming!");
		// console.log(data);
		flickerPics = data.photos.photo;
		getPic();
	})
}

function getPic(){
	var i = (Math.floor(Math.random() * flickerPics.length));
	console.log("i :" + i);
	var photoId = flickerPics[i].id;
	var serverId = flickerPics[i].server;
	var farmId = flickerPics[i].farm;
	var secret = flickerPics[i].secret;
	var imageUrl = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + photoId + "_" + secret + ".jpg";
	console.log(imageUrl);
	// $('body').css("background-image", `url(${imageUrl})`); 
	$("#background").css("background-image", `url(${imageUrl})`);
}