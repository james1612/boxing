

function httpRequest(method, url, callback, headers, body) {
	request = new XMLHttpRequest();
	request.open(method, url);
	request.onload = () => {
		callback(request);
	}
	for (let key in headers) {
		request.setRequestHeader(key, headers[key]);
	}
	body ? request.send(body) : request.send();
}


function addEvent() {
	console.log('added event');
}

function removeEvent() {
	console.log('removed event');
}

function editEvent() {
	console.log('edited event');
}

