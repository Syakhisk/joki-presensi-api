window.onload = function () {
	document.querySelector("#tanggal").value = today();
};

const formSubmit = (form) => {
	const formData = serialize(form);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/presensi");
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.seenBytes = 0;

	xhr.onreadystatechange = function () {
		console.log("state change.. state: " + xhr.readyState);

		if (xhr.readyState == 3) {
			var newData = xhr.response.substr(xhr.seenBytes);
			console.log("newData: <<" + newData + ">>");
			// document.body.innerHTML += "New data: <<" + newData + ">><br />";
			document.querySelector("#log") += "New data: <<" + newData + ">><br />";

			xhr.seenBytes = xhr.responseText.length;
			console.log("seenBytes: " + xhr.seenBytes);
		}
	};

	xhr.addEventListener("error", function (e) {
		console.log("error: " + e);
	});

	// console.log(xhr);
	xhr.send(JSON.stringify(formData));
	// xhr.send();
};

const today = () => {
	let d = new Date();

	const day = d.getDay();
	const date = d.getDate();
	const month = d.getMonth();
	const year = d.getFullYear();

	const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

	const bulan = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	let str = hari[day] + ", " + date + " " + bulan[month] + " " + year;

	return str;
};

const serialize = (form) => {
	let arr = [];
	Array.prototype.slice.call(form.elements).forEach(function (field) {
		if (
			!field.name ||
			field.disabled ||
			["file", "reset", "submit", "button"].indexOf(field.type) > -1
		)
			return;
		if (field.type === "select-multiple") {
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				arr.push(
					encodeURIComponent(field.name) +
						"=" +
						encodeURIComponent(option.value)
				);
			});
			return;
		}
		if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked)
			return;
		arr.push(
			encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value)
		);
	});

	let obj = {};
	arr.forEach((item) => {
		const temp = item.split("=");
		obj[temp[0]] = decodeURIComponent(temp[1]);
	});

	return obj;
};
