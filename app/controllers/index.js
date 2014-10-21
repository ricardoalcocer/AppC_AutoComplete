var waitForPause, pauseDelay = 1000;

$.wordTV.addEventListener('click', function(e) {
	Ti.API.info("index: $.wordTV.addEventListener(click)");
	
	alert("row clicked, word = "+e.row.word);	
});

function resetTable(table) {
	Ti.API.info("index: resetTable()");
	
	var rd = [];
	table.data = rd;
}

function processInput(){
	Ti.API.info("index: processInput()");
	
	if($.wordTF.value=="" || $.wordTF.value==null) {
		resetTable($.wordTV);
	} else {
		getWords($.wordTF.value, {
			success: function(e) {
				Ti.API.info('Recieved data = '+e);
				loadTable(e, $.wordTV);
			},
			error: function(e) {
				Ti.API.info('Error = '+e);
				alert("No network or server not available. Please try again.");
			}
		});	
	}
}

$.wordTF.addEventListener('change', function(e){
	Ti.API.info("index: $.wordTF.addEventListener(change)");
	
	//processInput();
	
	clearTimeout(waitForPause);
	waitForPause = setTimeout(processInput, pauseDelay);
});

$.wordTF.addEventListener('return', function(e){
	Ti.API.info("index: $.wordTF.addEventListener(change)");
	
	processInput();
});

function loadTable(e, table) {
	Ti.API.info("index: loadTable()");
	
	var reply = JSON.parse(e);
    var rows = [];
    var i = 0;
    
    Ti.API.info("index: reply = "+reply);
    
    if(reply.searchResults.length>0){
        
        _.each(reply.searchResults, function(item) {
        		rows.push(Alloy.createController('wordRow', {
				word: item.word,
			}).getView());
		});
    
	}
	else {
		alert("No words found.");
	}
	
	//$.wordTV.setData(rows);
	table.setData(rows);
}

function getWords(text, o){
	Ti.API.info("getWords() - text = "+text);
	
	if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
		Ti.API.info("markit: ondemand() - No Network");
		if (o.error) { o.error("No Network"); };
		return;
	}
	
	var xhr = Titanium.Network.createHTTPClient({
		onload: function() {
			if (o.success) { o.success(this.responseText); };		
		},
		onerror: function(e) {
			if (o.error) { o.error("Error with wordnik API"); };
		},
		timeout: 10000,
	});
	
	xhr.open("GET", "http://api.wordnik.com/v4/words.json/search/"+Ti.Network.encodeURIComponent(text)+"?api_key=3fc30fd2caff363468b3a4c28675145127f8640f06715d94f");
	xhr.send();
};

$.index.open();
