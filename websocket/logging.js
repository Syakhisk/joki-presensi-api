module.exports = function useLogging(ws, invoker) {
	return (data) => {
		console.log(`${invoker}: ${data}`);
		ws.send(data);
	};
};
