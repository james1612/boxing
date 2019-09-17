

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

function displayEvents() {
	let method = "GET";
	let url = 'http://localhost:9000/events';
	body = null;
	let callback = createNewTable;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
}

//CHANGE TOO ON PAGE LOAD
displayEvents()


function postEvent(event) {
	// let data = formToObject(event.target);
	let method = 'POST';
	let url = 'http://localhost:9000/events';
	let body = formToObject(event.target);
	let callback = displayEvents;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
	return false
}

function createNewTable(request) {
	let jsonDataList = JSON.parse(request.response);
	let returned = document.getElementById("returned");
	if (returned) {
		document.getElementById('mainTable').removeChild(returned);
	}
	returned = document.createElement('tbody');
	returned.setAttribute("id", "returned");
	for (let i = 0; i < jsonDataList.length; i++) {
		returned.appendChild(jsonToTableEntry(jsonDataList[i]));
	}
	document.getElementById('mainTable').appendChild(returned);

	$('#exampleModal').modal('hide')
}



function formToObject(formElement) {
	let body = {}
	for (let input of event.target) {
		if (input.name) { // dont include the submit button
			body[input.name] = input.value;
			input.value = "";
		}
	}
	return JSON.stringify(body);
}

function jsonToTableEntry(jsonData) {
	let mytr = document.createElement('tr');
	for (element in jsonData) {
		let mytd = document.createElement('td');
		mytd.setAttribute("onclick", "changeToInput(event)")
		mytd.innerText = jsonData[element];
		mytr.appendChild(mytd);
	}


	let buttontd = document.createElement('td');
	let buttonWrapper = document.createElement('div');
	buttonWrapper.className = "btn-toolbar";

	editButton = createEditButton(jsonData.id);
	deleteButton = createDeleteButton(jsonData.id);

	buttontd.appendChild(editButton);
	buttontd.appendChild(deleteButton);



	mytr.appendChild(buttontd)

	return mytr;
}

function createDeleteButton(id) {
	let button = document.createElement('button');
	button.innerText = "Delete";
	button.setAttribute("onclick", `deleteBoxer(${id})`);
	button.className = 'btn btn-danger';
	return button;
}


function createEditButton(id) {
	let button = document.createElement('button');
	button.innerText = "Edit";
	button.setAttribute("onclick", `createForm(${id})`);
	button.className = 'btn btn-info mr-1';
	return button;
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

