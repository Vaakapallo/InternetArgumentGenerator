var topics = ["feminism", "gender", "equalism", "everything", "chauvinism", "gender identity", "sexism"];
var templates = ["argument.mst", "complaint.mst", "hate.mst", "fakestats.mst"];
var random = ["rhinoceros", "octopus", "tyrannosaurus rex", "raptor", "vacuum Cleaner", "hippopotamus"];
var groupPlural = ["feminists", "gays", "lesbians", "transsexuals", "asexuals", "men", "women"];
var group = ["feminist", "gay", "lesbian", "transsexual", "asexual", "men", "women"];
var leadUps = ["did you know that", "actually", "I'll have you know that", 
"don't you know that", "how don't you understand that", "I saw a Youtube video that said that"];
var bullshitWords = ["Actually", "In fact"]

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
     percent: percentage
     });
    rendered = rendered.replace("&#39;", "'");
	var msg = new SpeechSynthesisUtterance();
	var voices = speechSynthesis.getVoices();
	//console.log(voices);
	//msg.voice = voices[2]; // Note: some voices don't support altering params
	//msg.voice = voices[Math.floor(Math.random()*11)]; // Note: some voices don't support altering params
	//console.log([Math.floor(Math.random()*11)]);
	//msg.voiceURI = 'native';
	//msg.volume = 1; // 0 to 1
	//msg.rate = 1; // 0.1 to 10
	//msg.pitch = 0; //0 to 2
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

loadArgumentTemplate();