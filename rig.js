var topics = ["feminism", "gender", "equalism", "everything", "chauvinism", "gender identity", "sexism"];
var templates = ["complaint.mst", "hate.mst", "fakestats.mst", "important.mst", "everything.mst", "ruined.mst"];
var random = ["rhinoceros", "octopus", "tyrannosaurus rex", "raptor", "vacuum cleaner", "hippopotamus"];
var groupPlural = ["feminists", "gays", "lesbians", "transgenders", "men", "women"];
var group = ["feminist", "gay", "lesbian", "transgender", "asexual", "men", "women"];
var leadUps = ["did you know that", "actually", "I'll have you know that", 
"don't you know that", "how don't you understand that", 
"I saw a Youtube video that said that" , "I read on a blog that", "based on my research"];
var bullshitWords = ["actually", "in fact" , ""];
var importantnesses = ["the most important thing", "incredibly important", "very valuable", "essential" , "kind of relevant"];
var spaces = ["my life", "everyone's lives", "the modern society", "the world", "the internet", "Finland", "the modern world"];
var becauses = ["is because of", "can be blamed on", "is caused by", "happened because of"];
var dids = ["ruined", "saved", "destroyed", "fixed"];
var feels = ["hate", "don't care about", "really care about", "love", "kind of like"];
var bads = ["sucks", "is shit", "is horrible", "is stupid"];

function loadArgumentTemplate() {
  $.get(randomItem(templates), function(template) {
  	var percentage = Math.floor((Math.random() * 110));

  	console.log(percentage)

    var rendered = Mustache.render(template, {
     topic: randomTopic(),
     random: randomItem(random),
     groupPlural: randomItem(groupPlural),
     otherGroupPlural: randomItem(groupPlural),
     group: randomItem(group),
     leadUp: randomItem(leadUps),
     percent: percentage,
     importantness: randomItem(importantnesses),
     space: randomItem(spaces),
     because: randomItem(becauses),
     bullshit: randomItem(bullshitWords),
     did: randomItem(dids),
     feel: randomItem(feels),
     bad: randomItem(bads)
     });
    rendered = rendered.replace("&#39;", "'");
	var msg = new SpeechSynthesisUtterance();
	var voices = speechSynthesis.getVoices();
	console.log(voices);
	//msg.voice = voices[Math.floor(Math.random() * 10)]; // Note: some voices don't support altering params
	msg.voice = voices[Math.floor(Math.random()*11)]; // Note: some voices don't support altering params
	//console.log([Math.floor(Math.random()*11)]);
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 0.2 + Math.random() * 1; //0 to 2

	msg.text = rendered;
	msg.lang = 'en-US';

	console.log(rendered);

	msg.onend = function(e) {
	  console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

	speechSynthesis.speak(msg);
	//loadArgumentTemplate();
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

var interval = setInterval(loadArgumentTemplate, 2000);