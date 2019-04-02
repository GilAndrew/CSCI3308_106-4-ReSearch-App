/*
Function to make either the student form or researcher form in view based on onclick
*/
function Student_Researcher_Visibility(id, toggle)
{
	if(toggle == 0)
	{
		document.getElementById(id).style.visibility = "hidden";
		document.getElementById(id).style.height = "0px";
	}
	else if(toggle == 1)
	{
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id).style.height = "auto";
	}
}

function student_form_called(callback)
{
	/*
	going to have to manually insert student value
	*/
	var Name = document.getElementById("Student-js").elements["Name"];
	var User_name = document.getElementById("Student-js").elements["User-name"];
	var Email = document.getElementById("Student-js").elements["Email"];
	var Year = document.getElementById("Student-js").elements["Year"];
	var Birthday = document.getElementById("Student-js").elements["Birthday"];
	var Password = document.getElementById("Student-js").elements["Password"];
	var Confirm_Password = document.getElementById("Student-js").elements["Confirm-Password"];

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://localhost:3000/user_registration", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.response);
			//Check if email is unique
			if (response.data[0].exists) {
				alert("The email you entered has already been registered")
			}
			else {
				// Callback used to redirect user to homepage after inserting data into database
				callback()
			}
		}
	}
	xmlhttp.send(JSON.stringify({name:Name.value, username:User_name.value, email:Email.value, year:Year.value, birthday:Birthday.value, password:Password.value, confirm_password:Confirm_Password.value}));
	
}

function researcher_form_called(callback)
{
	/*
	going to have to manually insert the researcher value
	*/
	var Email = document.getElementById("Researcher-js").elements["Email"];
	var Name = document.getElementById("Researcher-js").elements["Name"];
	var Password = document.getElementById("Researcher-js").elements["Password"];
	var Confirm_Password = document.getElementById("Researcher-js").elements["Confirm-Password"];

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://localhost:3000/researcher_registration", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.response);
			//Check if email is unique
			if (response.data[0].exists) {
				alert("The email you entered has already been registered")
			}
			else {
				// Callback used to redirect user to homepage after inserting data into database
				callback()
			}
		}
	}
	xmlhttp.send(JSON.stringify({name:Name.value, email:Email.value, password:Password.value, confirm_password:Confirm_Password.value}));
}

function toHomepage() {
	// redirects to homepage
	location.href = "file:///home/luke/Documents/CSCI3308_106-4-ReSearch-App/ReSearch/views/index.html";
}