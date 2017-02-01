console.log('chat.js is loaded');

//routine-task execution
var submit = document.getElementById('submit');

//refresh chat list
function refresh(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == XMLHttpRequest.DONE ){
			if(req.status==200){
				var data = req.responseText;
				data = JSON.parse(data);
				if(data.length!=0){
					var listR = "";
					for(var i=0;i<data.length;i++){
						var part1 = data[i].substring(0,data[i].indexOf("separatorX"));
						var part2 = data[i].substring(data[i].indexOf("separatorX")+10, data[i].length);
						listR += '<li>' + part1 + ' says: ' + part2 + ' </li>'; 
						var newL = document.getElementById('list');
						newL.innerHTML = listR;
					}
				}
			}
		}
	};
    req.open('GET', 'http://localhost:8080/get-data/' , true);
	req.send(null);
}
function refreshList(){
	if (typeof(w) == "undefined") {
		worker = new Worker('/ui/refresh.js');
	}
	worker.onmessage = function (msg) {
		refresh();
	}
}

submit.onclick = function() {

	//Create a request object
	var request = new XMLHttpRequest();
	//Capture the response
	request.onreadystatechange = function(){
		if(request.readyState == XMLHttpRequest.DONE ){
			if(request.status==200){
				var data = request.responseText;
				data = JSON.parse(data);
				var listR = "";
				for(var i=0;i<data.length;i++){
					var part1 = data[i].substring(0,data[i].indexOf("separatorX"));
					var part2 = data[i].substring(data[i].indexOf("separatorX")+10, data[i].length);
					listR += '<li>' + part1 + ' says: ' + part2 + ' </li>'; 
					var newL = document.getElementById('list');
					newL.innerHTML = listR;
				}
			}
		}
	};
	
	//Make a request
	var nameBOX = document.getElementById('name');
	var name = nameBOX.value;
	var msgBOX = document.getElementById('msg');
	var message = msgBOX.value;
	if(name.trim()=="" || message.trim()==""){
		var warning = document.getElementById('warns');
		warning.innerHTML = 'Please check your input and try again';
	}
	else {
		nameBOX.readOnly = true;
		msgBOX.value = "";
		var data = name.trim() + 'separatorX' + message.trim();
		var warning = document.getElementById('warns');
		warning.innerHTML = '';
		request.open('GET', 'http://localhost:8080/submit-data/?data='+data, true);
		request.send(null);
	}
	refreshList();
};