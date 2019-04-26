var userType = 's'  // user type defaults to student

function login(callback) {
	var Email = document.getElementById("sign_in_form").elements["inputEmail"];
	var Password = document.getElementById("sign_in_form").elements["inputPassword"];

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	if (userType == 's') {
		xmlhttp.open("POST", "/student_login", true);
		//xmlhttp.open("POST", "http://localhost:3000/student_login", true);
	}
	else {
		xmlhttp.open("POST", "/researcher_login", true);
		//xmlhttp.open("POST", "http://localhost:3000/researcher_login", true);
	}
	
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.response)
			response = JSON.parse(this.response);
			//alert(response.inTable[0].exists);
			if (response.inTable[0].exists){
				window.sessionStorage.setItem('userID', response.id[0].id) // Store userID in session storage
				window.sessionStorage.setItem('userType', userType) // Store userType
				callback()
			}
			else {
				alert("We were unable to find a profile with that email/password")
			}
		}
	}
	xmlhttp.send(JSON.stringify({email:Email.value, password:Password.value}));
}

function toHomepage() {
	// redirects to homepage
	location.href = "index.html";
}

function switchToStudent() {
	document.getElementById("email-field").placeholder = "Student Email Address";
	document.getElementById("student-button").style.borderWidth = 'medium';
	document.getElementById("researcher-button").style.borderWidth = 'thin';
}

function switchToResearcher() {
	document.getElementById("email-field").placeholder = "Researcher Email Address";
	document.getElementById("researcher-button").style.borderWidth = 'medium';
	document.getElementById("student-button").style.borderWidth = 'thin';
}