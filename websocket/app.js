const WebSocket = require("ws");
const login = require("../lib/pptr-ws/Login");

module.exports = (server) => {
	const wss = new WebSocket.Server({ server: server });
	wss.on("connection", (ws, req) => {
		console.log(
			`A new connection is established from ${req.socket.remoteAddress}`
		);

		ws.on("message", (data) => {
			console.log(data);
			console.log(JSON.parse(data));
		});
	});

	wss.on("close", (ws) => {
		console.log("Kabor");
	});
};

/**
 *console.log("Message recieved: " + data);
 *console.log(parsed);
 *ws.send(parsed.body.nrp);
 *setTimeout(() => {
 *	ws.send("Dua");
 *}, 2000);
 *const parsed = JSON.parse(data);
 */
