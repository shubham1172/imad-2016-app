console.log('main.js is loaded!');
//Animate the image

var img = document.getElementById('profile');
var pos = 0;
var flag = true;
function move(){
	if(flag){
		pos = pos + 10;
		flag = false;
	}
	else{
		pos = pos - 10;
		flag = true;
	}
	img.style.marginLeft = pos + 'px';
}
img.onclick = function(){
	var interval = setInterval(move, 500);
};

//Counter code

var button = document.getElementById('counter');
button.onclick = function() {
	
	//Create a request object
	var request = new XMLHttpRequest();
	//Capture the response
	request.onreadystatechange = function(){
		if(request.readyState == XMLHttpRequest.DONE ){
			if(request.status==200){
				var counter = request.responseText;
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}
	};
	
	//Make a request
	request.open('GET', 'http://localhost:8080/counter' ,true);
	request.send(null);
};