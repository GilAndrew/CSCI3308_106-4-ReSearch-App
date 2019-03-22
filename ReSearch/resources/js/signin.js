function login() {
	var Email = document.getElementById("sign_in_form").elements["inputEmail"];
	var Password = document.getElementById("sign_in_form").elements["inputPassword"];

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://localhost:3000/login", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(this.response)
			response = JSON.parse(this.response);
			//alert(response.inTable[0].exists);
			if (response.inTable[0].exists){
				alert("We found your profile!");
			}
			else {
				alert("We were unable able to find a profile with that email/password")
			}
		}
	}
	xmlhttp.send(JSON.stringify({email:Email.value, password:Password.value}));
	alert("Searching for profile...");
}