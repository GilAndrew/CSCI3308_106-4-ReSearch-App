function login(callback) {
	var Email = document.getElementById("sign_in_form").elements["inputEmail"];
	var Password = document.getElementById("sign_in_form").elements["inputPassword"];

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
	xmlhttp.open("POST", "http://localhost:3000/student_login", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.response)
			response = JSON.parse(this.response);
			//alert(response.inTable[0].exists);
			if (response.inTable[0].exists){
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
	location.href = "file:///home/luke/Documents/CSCI3308_106-4-ReSearch-App/ReSearch/views/index.html";
}

function switchToStudent() {
	document.getElementById("email-field").placeholder = "Student Email Address";
}

function switchToResearcher() {
	document.getElementById("email-field").placeholder = "Researcher Email Address";
}
