var topics = ["Feminism", "Gender", "Equalism", "Everything", "Chauvinism"];
var themes = [];

function loadGameTemplate() {
  $.get('argument.mst', function(template) {
  	var tts = new GoogleTTS();

    var rendered = Mustache.render(template, {
     topic: randomTopic()
     });
    tts.play(rendered);
    ;
  });
}

function randomTopic(){
	return randomItem(topics);
}

function randomItem(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function nRandomTopics(array,n){
	var items = [];

	while(items.length < n) {
		var item = randomItem(array);
		console.log(item);
		if($.inArray(item, items) == -1){
			items.push(item);
		}
	};

	objectItems = [];
	for (var i = items.length - 1; i >= 0; i--) {
		var object = {mech: items[i]};
		objectItems.push(object);
	};
	
	return objectItems;
}

loadGameTemplate();