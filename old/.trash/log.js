window.onload = function () {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/absen");
	xhr.seenBytes = 0;

	xhr.onreadystatechange = function () {
		console.log("state change.. state: " + xhr.readyState);

		if (xhr.readyState == 3) {
			var newData = xhr.response.substr(xhr.seenBytes);
			console.log("newData: <<" + newData + ">>");
			document.body.innerHTML += "New data: <<" + newData + ">><br />";

			xhr.seenBytes = xhr.responseText.length;
			console.log("seenBytes: " + xhr.seenBytes);
		}
	};

	xhr.addEventListener("error", function (e) {
		console.log("error: " + e);
	});

	console.log(xhr);
	xhr.send();
};
