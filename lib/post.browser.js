module.exports = (url, body) => {
	return new Promise((resolve, reject) => {
		const http = new XMLHttpRequest();

		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/json");

		http.onreadystatechange = () => {
			if(http.readyState == 4) {
				if(http.status == 200) {
					resolve(http.responseText);
				} else {
					reject(new Error(""));
				}
			}
		};

		http.send(body);
	});
};
