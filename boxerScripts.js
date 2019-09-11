const dummydata = {
	"id": 135,
	"firstName": "Caneloooooooo",
	"lastName": "Alvarezz",
	"age": 235,
	"nationality": "Mexico"
};

const dummyJsonListData = [{ "id": 33, "firstName": "James", "lastName": "Irish", "age": 25, "nationality": "U.K." },
{ "id": 65, "firstName": "Caneloooooooo", "lastName": "Alvarez", "age": 235, "nationality": "Mexico" },
{ "id": 66, "firstName": "cunt", "lastName": "cunt", "age": 12323, "nationality": "Mexico" }]

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

// ONLY FOR EDIT / DELETE SO FAR
function createButton(id, action) {
	let buttonTemplate = document.createElement('button');
	buttonTemplate.innerText = action;
	buttonTemplate.setAttribute("onclick", `${action.toLowerCase()}Boxer("${id}")`);

	if (action === "Edit") {
		buttonTemplate.className = 'btn btn-info';
	}
	if (action === "Delete") {
		buttonTemplate.className = 'btn btn-danger';
	}
	return buttonTemplate;
}

function createEditButton(id) {
	let button = document.createElement('button');
	button.innerText = action;
	button.setAttribute("onclick", "createform()");

	if (action === "Edit") {
		button.className = 'btn btn-info';
	}
	if (action === "Delete") {
		button.className = 'btn btn-danger';
	}
	return button;
}


function createImage() {
	let avatar = document.createElement('img');
	avatar.id = 'avatar'
	avatar.setAttribute("src", "https://media.gettyimages.com/photos/canelo-alvarez-celebrates-after-his-majoritydecision-win-over-gennady-picture-id1033990304?s=612x612");
	avatar.style.borderRadius = "50%";
	avatar.style.width = "50px";
	avatar.style.height = "50px";


	let returnedTd = document.createElement('td');
	returnedTd.appendChild(avatar);
	return returnedTd;
}


function jsonToTableEntry(jsonData) {
	let mytr = document.createElement('tr');
	for (element in jsonData) {
		let mytd = document.createElement('td');
		mytd.innerText = jsonData[element];
		mytr.appendChild(mytd);
	}


	let buttontd = document.createElement('td');

	editButton = createButton(jsonData.id, "Edit");
	deleteButton = createButton(jsonData.id, "Delete");

	buttontd.appendChild(editButton);
	buttontd.appendChild(deleteButton);



	mytr.appendChild(buttontd)
	mytr.appendChild(createImage());

	return mytr;
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
}


function displayBoxers() {
	let method = "GET";
	let url = 'http://localhost:9000/boxers';
	body = null;
	let callback = createNewTable;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
}

//CHANGE TOO ON PAGE LOAD
displayBoxers()

function postBoxer(event) {
	// let data = formToObject(event.target);
	let method = 'POST';
	let url = 'http://localhost:9000/boxers';
	let body = formToObject(event.target);
	let callback = displayBoxers;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers, body);
	return false
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


function deleteBoxer(id) {
	let method = "DELETE";
	let url = `http://localhost:9000/boxers/${id}`;
	let callback = displayBoxers;
	let headers = {
		"Content-Type": "application/json"
	}
	httpRequest(method, url, callback, headers);
}


function editBoxer(event, id) {
	let myForm = createForm();
	document.getElementsByTagName('body')[0].appendChild(myForm);
	let method = "PUT";
	let url = "http://localhost:9000/boxers/";
	let callback = displayBoxers;
	let headers = {
		"Content-Type": "application/json"
	}
	tempObject = JSON.parse(formToObject(event.target));
	Object.assign(tempObject, {id : id});
	console.log(tempObject);
	let body = JSON.stringify(tempObject);
	console.log(body);
	httpRequest(method, url, callback, headers, body);
	return false;
}


function createForm() {
	var form = document.createElement("form");
	form.setAttribute('onsubmit', "return editBoxer(event)");

	var firstName = document.createElement("input"); //input element, text
	firstName.setAttribute('type', "text");
	firstName.setAttribute('name', "firstName");

	var lastName = document.createElement("input"); //input element, text
	lastName.setAttribute('type', "text");
	lastName.setAttribute('name', "lastName");

	var age = document.createElement("input"); //input element, text
	age.setAttribute('type', "number");
	age.setAttribute('name', "age");

	var nationality = document.createElement("input"); //input element, text
	nationality.setAttribute('type', "text");
	nationality.setAttribute('name', "nationality");


	var submit = document.createElement("input"); //input element, Submit button
	submit.setAttribute('type', "submit");
	submit.setAttribute('value', "Submit");

	form.innerText = 'First name:';
	form.appendChild(firstName);
	form.appendChild(lastName);
	form.appendChild(age);
	form.appendChild(nationality);
	form.appendChild(submit);

	return form;
}