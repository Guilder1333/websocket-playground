var sprite;
var socket = new WebSocket("ws://localhost:8080");
socket.onopen = function() {
	
};
socket.onmessage = function(event) {
	var json = JSON.parse(event.data);
	if (json.moved && sprite) {
		sprite.style.left = (320 + json.position.x * 32) + "px";
		sprite.style.top = (320 + json.position.y * 32) + "px";
	}
	
};

window.addEventListener("load", function() {
	var div = document.createElement("DIV");
	div.style.cssText = "width:640px;height:640px;background:#202040;position:relative;";
	document.body.appendChild(div);
	sprite = document.createElement("DIV");
	sprite.style.cssText = "background:cornflowerblue;left:0;top:0;position:absolute;width:32px;height:32px;";
	div.appendChild(sprite);
});
window.addEventListener("beforeunload", function (event) {
	socket.close();
});
document.addEventListener("keydown", function(e) {
	console.log(e.keyCode);
	var direction = 0;
	switch(e.keyCode) {
		case 38:
			direction = 1;
			break;
		case 40:
			direction = 3;
			break;
		case 37:
			direction = 2;
			break;
		case 39:
			direction = 4;
			break;
		default:
			return;
	}
	var json = {
		move: true,
		direction: direction
	};
	socket.send(JSON.stringify(json));
}, true);