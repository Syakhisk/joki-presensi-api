const login = require("../lib/pptr-ws/Login");
const WebSocket = require("ws");

const Login = require("../lib/pptr-ws/Login");

module.exports = (server) => {
	// server.on("upgrade", function upgrade(request, socket, head) {
	// const wss = new WebSocket.Server({ server: server, path: "/ws" });
	const wss = new WebSocket.Server({ server: server });
	wss.on("connection", (ws, req) => {
		console.log(
			`A new connection is established from ${req.socket.remoteAddress}`
		);

		ws.on("message", (data) => {
			// console.log("Message recieved: " + data);
			// console.log(parsed);
			// ws.send(parsed.body.nrp);
			// setTimeout(() => {
			// 	ws.send("Dua");
			// }, 2000);
			const parsed = JSON.parse(data);
			
		});
	});

	wss.on("close", (ws) => {
		console.log("Kabor");
	});
	// });
};
