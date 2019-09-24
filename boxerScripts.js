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

function createDeleteButton(id) {
	let button = document.createElement("button");
	button.innerText = "Delete";
	button.setAttribute("onclick", `deleteBoxer(${id})`);
	button.className = 'btn btn-danger';
	return button;
}



function createEditButton(boxer) {
	let button = document.createElement("button");
	button.innerText = "Edit";
	button.addEventListener('click', () => {
		const formEl = document.getElementById("editForm");
		formEl.boxer = boxer;
		for (const key in boxer) {
			if (key && formEl.children[key]) {
				formEl.children[key].value = boxer[key];
			}
		};
		$("#editBoxer").modal("show");
	});
	button.className = "btn btn-info mr-1";
	return button;
}




function jsonToTableEntry(jsonData) {
	let mytr = document.createElement('tr');
	for (element in jsonData) {
		let mytd = document.createElement("td");
		mytd.setAttribute("onclick", "changeToInput(event)");
		mytd.innerText = jsonData[element];
		mytr.appendChild(mytd);
	}


	let buttontd = document.createElement('td');
	// let buttonWrapper = document.createElement("div");
	// buttonWrapper.className = "btn-toolbar";

	let editButton = createEditButton(jsonData);
	let deleteButton = createDeleteButton(jsonData.id);

	buttontd.appendChild(editButton);
	buttontd.appendChild(deleteButton);



	mytr.appendChild(buttontd)

	return mytr;
}


function createNewTable(request) {
	let jsonDataList = JSON.parse(request.response);
	let returned = document.getElementById("returned");
	if (returned) {
		document.getElementById('mainTable').removeChild(returned);
	}
	returned = document.createElement("tbody");
	returned.setAttribute("id", "returned");
	for (let i = 0; i < jsonDataList.length; i++) {
		returned.appendChild(jsonToTableEntry(jsonDataList[i]));
	}
	document.getElementById("mainTable").appendChild(returned);

	$('#exampleModal').modal('hide')
}


function displayBoxers() {
	let method = "GET";
	let url = 'http://http://34.89.62.82:9000/boxers';
	body = null;
	let callback = createNewTable;
	let headers = {
		"Content-Type": "application/json"
	};
	httpRequest(method, url, callback, headers, body);
}

//CHANGE TOO ON PAGE LOAD
displayBoxers();


function formToObject(formElement) {
	let body = {};
	for (let input of event.target) {
		if (input.name) { // dont include the submit button
			body[input.name] = input.value;
			input.value = "";
		}
	}
	return JSON.stringify(body);
}

function postBoxer(event) {
	// let data = formToObject(event.target);
	let method = 'POST';
	let url = 'http://34.89.62.82:9000/boxers';
	let body = formToObject(event.target);
	let callback = displayBoxers;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
	return false;
}


function editBoxer({ boxer, children }) {
	let method = "POST";
	let url = "http://34.89.62.82:9000/boxers/";
	let callback = () => {
		$('#editBoxer').modal('hide');
		displayBoxers();
	};
	let headers = { "Content-Type": "application/json" };
	for (const key in boxer) {
		if (key && children[key]) {
			boxer[key] = children[key].value;
		}
	}

	httpRequest(method, url, callback, headers, JSON.stringify(boxer));
	return false;
}




function deleteBoxer(id) {
	let method = "DELETE";
	let url = `http://34.89.62.82:9000/boxers/${id}`;
	let callback = displayBoxers;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers);
}





function createForm(id) {
	var form = document.createElement("form");
	form.setAttribute("onsubmit", `return editBoxer(event, ${id})`);

	var firstName = document.createElement("input");
	firstName.setAttribute('type', "text");
	firstName.setAttribute('name', "firstName");
	firstName.value = ('this is me ');
	var lastName = document.createElement("input");
	lastName.setAttribute('type', "text");
	lastName.setAttribute("name", "lastName");

	var age = document.createElement("input");
	age.setAttribute('type', "number");
	age.setAttribute('name', "age");

	var nationality = document.createElement("input");
	nationality.setAttribute('type', "text");
	nationality.setAttribute('name', "nationality");


	var submit = document.createElement("input");
	submit.setAttribute('type', "submit");
	submit.setAttribute('value', "Submit");

	form.innerText = 'First name:';
	form.appendChild(firstName);
	form.appendChild(lastName);
	form.appendChild(age);
	form.appendChild(nationality);
	form.appendChild(submit);

	document.body.appendChild(form);
}