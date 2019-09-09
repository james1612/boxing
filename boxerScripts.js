// const data = JSON.stringify({
// 	"id": 1,
// 	"firstName": "Caneloooooooooooooooooblahahhahaa",
// 	"lastName": "Alvarez",
// 	"age": 235,
// 	"nationality": "Mexico"
// });


// function formToObject(form) {
//     const formDataObj = {};
//     for (let element of form.elements) {
//         if (element.id) {
// 			formDataObj[element.id] = element.value;
//         }
// 	}
//     return formDataObj;
// }

function formToObject(form) {
    const formDataObj = {};
    for (let element of form.elements) {
        if (element.id) {
			formDataObj[element.id] = element.value;
        }
	}
    return formDataObj;
}


function postBoxer(form) {
	data = formToObject(form);
	console.log(data);
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			if (xhr.status == 200) {
				resolve(xhr.response);
			}
			else {
				reject('Request failed!');
			}
		}
		xhr.open('POST', 'http://localhost:9000/boxers');
		xhr.setRequestHeader("content-type", "application/json");
		xhr.send(data);
	});
}

// function postBoxer() {
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




function addBoxer() {
	console.log('added boxer');
}

function removeBoxer() {
	console.log('removed boxer');
}

function editBoxer() {
	console.log('edited boxer');
}

