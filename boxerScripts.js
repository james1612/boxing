const dummydata = {
	"id": 1,
	"firstName": "Caneloooooooooooooooooblahahhahaa",
	"lastName": "Alvarez",
	"age": 235,
	"nationality": "Mexico"
};

const dummyJsonListData = [{"id":33,"firstName":"James","lastName":"Irish","age":25,"nationality":"U.K."},
{"id":65,"firstName":"Caneloooooooooooooooooblahahhahaa","lastName":"Alvarez","age":235,"nationality":"Mexico"},
{"id":66,"firstName":"cunt","lastName":"cunt","age":12323,"nationality":"Mexico"}]

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

function jsonToTableEntry(jsonData) {
	let mytr = document.createElement('tr');
	for (element in jsonData) {
		let mytd = document.createElement('td');
		mytd.innerText = jsonData[element];
		mytr.appendChild(mytd);
	}
	let cell = document.createElement('td');
	let button = document.createElement('button');
	button.innerText = 'Delete';
	button.setAttribute("onclick", `deleteBoxer("${jsonData.id}")`);
	button.className = 'btn btn-danger';
	cell.appendChild(button);
	mytr.appendChild(cell);
	return mytr;
}

console.log(jsonToTableEntry(dummydata));

function createNewTable(request) {
	let jsonDataList = JSON.parse(request.response);
	let returned = document.getElementById("returned");
	if(returned) {
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





// function formToObject(form) {
//     const formDataObj = {};
//     for (let element of form.elements) {
//         if (element.id) {
// 			formDataObj[element.id] = element.value;
//         }
// 	}
//     return formDataObj;
// }

// function formToObject(form) {
// 	const formDataObj = {};
// 	for (let element of form.elements) {
// 		if (element.id) {
// 			formDataObj[element.id] = element.value;
// 		}
// 	}
// 	return formDataObj;
// }


// function postBoxer(form) {
// 	data = formToObject(form);
// 	console.log(data);
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
// 		xhr.onload = () => {
// 			if (xhr.status == 200) {
// 				resolve(xhr.response);
// 			}
// 			else {
// 				reject('Request failed!');
// 			}
// 		}
// 		xhr.open('POST', 'http://localhost:9000/boxers');
// 		xhr.setRequestHeader("content-type", "application/json");
// 		xhr.send(data);
// 	});
// }





// function removeBoxer(id) {
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
// 		xhr.onload = () => {
// 			if (xhr.status == 200) {
// 				resolve(xhr.response);
// 			}
// 			else {
// 				reject('Request failed!');
// 			}
// 		}
// 		xhr.open('DELETE', `http://localhost:9000/boxers/${id}`);
// 		xhr.setRequestHeader("content-type", "application/json");
// 		xhr.send();
// 	});
// }

// removeBoxer(1);

// removeBoxer(2);


function editBoxer() {
	console.log('edited boxer');
}

