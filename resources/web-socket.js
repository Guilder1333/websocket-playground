const http = require("http");
const fs = require("fs");
const path = require('path');
const WebSocketServer = require('websocket').server;
const nodeLocation = 'C:/Users/guild/Documents/projects';
const typesMap = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.ico': 'image/x-icon'
};
const playersMap = {};

let player = {
	id: 0,
	x: 0,
	y: 0,
	map: 
};

var server = http.createServer((req, res) => {
	const url = nodeLocation + (req.url === '/' ? "/index.html" : req.url);
	console.log(url);
	const ext = path.extname(url);
	fs.access(url, fs.constants.R_OK, (err) => {
		if (err) {
			res.writeHeader(404);
			res.end();
			console.warn(err);
		} else {
			fs.readFile(url, (err, data) => {
				if (err) {
					res.writeHeader(500);
					res.end();
					console.warn(err);
				} else {
					res.setHeader('Content-Type', typesMap[ext] || 'text/plain');
					res.end(data);
					console.log(200);
				}
			});
		}
	});
});

const webServer = new WebSocketServer({
	httpServer: server
});

webServer.on("request", (req) => {
	const connection = req.accept(null, req.origin);

	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log(message.utf8Data);
			var json = JSON.parse(message.utf8Data);
			if (json.move) {
				if ((json.direction & 1) === 1) {
					if (json.direction === 1) {
						player.y--;
					} else {
						player.y++;
					}
				} else {
					if (json.direction === 2) {
						player.x--;
					} else {
						player.x++;
					}
				}
			} else if (json.request) {
				if (json.request === "map") {
					
				}
			}
			
			connection.sendUTF(JSON.stringify({
				position: player,
				moved: true
			}));
		}
	});

	connection.on('close', function(connection) {
		console.log("closed");
	});
});

server.listen(8080, "localhost");