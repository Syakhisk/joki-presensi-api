const login = require("../lib/pptr-ws/Login");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ noServer: true });

wss.on("listening", () => console.log(`Listening on ${wss.address().address}`));

wss.on("connection", function connection(ws, req, client) {
	console.log(`New connection: ${req.socket.remoteAddress}`);
	ws.send("Successfully connected to the server!");

	ws.on("message", async (message) => {
		// console.log(`Incoming Message ${message}`);

		const data = JSON.parse(message);
		const { page, browser } = login(ws, data);
	});

	// ws.on("message", function incoming(message) {
	// 	console.log("from %s", message, req.socket.remoteAddress);
	// });
});
