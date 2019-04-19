/*
Function to make either the student form or researcher form in view based on onclick
*/

var current_visibility_confirm_S = false; /* For  keeping track of password confirm popup on S form */
var current_visibility_requirements_s = false; /* for keeping track of password req popup on S form */
var current_visibility_dropdown_s = false; /* for keeping track of dropdown popup visibility */
var det_confirm = false;
var det_requirements = false;
var det_dropdown = false;
/* Had to place these variables here due to weird bug where popup on student form would stay up if switched to researcher form.
for some reson the bug doesnt appear when there are popups on researcher and you swithc to student */

function Student_Researcher_Visibility(id, toggle)
{
	if(toggle == 0)
	{
		document.getElementById(id).style.visibility = "hidden";
		document.getElementById(id).style.height = "0px";
		/* Toggle student popups tog et rid of bug */
		if (id == "Student-Form")
		{
			if (current_visibility_confirm_S == true && det_confirm == false)
			{
				current_visibility_confirm_S = document.getElementById("no-match-s").classList.toggle("show");
				det_confirm = true;
			}
			if (current_visibility_requirements_s == true && det_requirements == false)
			{
				current_visibility_requirements_s = document.getElementById("no-req-s").classList.toggle("show");
				det_requirements = true;
			}
			if (current_visibility_dropdown_s == true && det_dropdown == false)
			{
				current_visibility_dropdown_s = document.getElementById("no-option-s").classList.toggle("show");
				det_dropdown = true;
			}
		}
	}

	if(toggle == 1)
	{
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id).style.height = "auto";
		/* Toggle student popups to get rid of bug */
		if (id == "Student-Form")
		{
			if (current_visibility_confirm_S == false && det_confirm == true)
			{
				current_visibility_confirm_S = document.getElementById("no-match-s").classList.toggle("show");
				det_confirm = false;
			}
			if (current_visibility_requirements_s == false && det_requirements == true)
			{
				current_visibility_requirements_s = document.getElementById("no-req-s").classList.toggle("show");
				det_requirements = false;
			}
			if (current_visibility_dropdown_s == false && det_dropdown == true)
			{
				current_visibility_dropdown_s = document.getElementById("no-option-s").classList.toggle("show");
				det_dropdown = false;
			}
		}
	}	
}

/* 
JS to update password requirements for student and researcher 
*/
var student_pass = document.getElementById("Student-js").elements["Password"];
var upper_s = document.getElementById("upper-s");
var digit_s = document.getElementById("digit-s");
var char_s = document.getElementById("char-s");

var researcher_pass = document.getElementById("Researcher-js").elements["Password"];
var upper_r = document.getElementById("upper-r");
var digit_r = document.getElementById("digit-r");
var char_r = document.getElementById("char-r");

/*
Onkeyup functions for each form
*/
function checks() {
	/* Student Checks */

	student_pass.onkeyup = function(){
		console.log("in student checks");

        var upperCaseLetters = /(?=.*[A-Z])/g; 
        var numbers = /(?=.*\d)/g;
		var minLength = 8;
		
		if(student_pass.value.match(upperCaseLetters)) {            
            upper_s.classList.remove("not-correct"); 
            upper_s.classList.add("correct"); 
        } else {
            upper_s.classList.remove("correct"); 
            upper_s.classList.add("not-correct"); 
		}
		
		if(student_pass.value.match(numbers)) {            
            digit_s.classList.remove("not-correct"); 
            digit_s.classList.add("correct"); 
        } else {
            digit_s.classList.remove("correct"); 
            digit_s.classList.add("not-correct"); 
		}
		
		if(student_pass.value.length >= minLength) {            
            char_s.classList.remove("not-correct"); 
            char_s.classList.add("correct"); 
        } else {
            char_s.classList.remove("correct"); 
            char_s.classList.add("not-correct"); 
        }
	}

	/* researcher Checks */

	researcher_pass.onkeyup = function(){
		console.log("in researcher checks");

        var upperCaseLetters = /(?=.*[A-Z])/g; 
        var numbers = /(?=.*\d)/g;
		var minLength = 8;
		
		if(researcher_pass.value.match(upperCaseLetters)) {            
            upper_r.classList.remove("not-correct"); 
            upper_r.classList.add("correct"); 
        } else {
            upper_r.classList.remove("correct"); 
            upper_r.classList.add("not-correct"); 
		}
		
		if(researcher_pass.value.match(numbers)) {            
            digit_r.classList.remove("not-correct"); 
            digit_r.classList.add("correct"); 
        } else {
            digit_r.classList.remove("correct"); 
            digit_r.classList.add("not-correct"); 
		}
		
		if(researcher_pass.value.length >= minLength) {            
            char_r.classList.remove("not-correct"); 
            char_r.classList.add("correct"); 
        } else {
            char_r.classList.remove("correct"); 
            char_r.classList.add("not-correct"); 
        }
	}
}

/* 
JS that submits forms
*/
function student_form_called(callback)
{

	var Name = document.getElementById("Student-js").elements["Name"];
	var User_name = document.getElementById("Student-js").elements["User-name"];
	var Email = document.getElementById("Student-js").elements["Email"];
	var Year = document.getElementById("Student-js").elements["Year"];
	var Major = document.getElementById("Student-js").elements["Major"];
	var Birthday = document.getElementById("Student-js").elements["Birthday"];
	var Password = document.getElementById("Student-js").elements["Password"];
	var Confirm_Password = document.getElementById("Student-js").elements["Confirm-Password"];

	/* 
	Confirm Passwords and check password requirements and check drop down slection
	*/
	var requirements = (digit_s.classList == "not-correct" || upper_s.classList == "not-correct" || char_s.classList == "not-correct");
	var pass_check = (Password.value != Confirm_Password.value);
	var drop_check = (Year.value == "Select Year of Education");

	if (pass_check || requirements || drop_check)
	{
		/* Clear password input fields */

		if (pass_check || requirements)
		{
			document.getElementById("Student-js").elements["Password"].value = "";
			document.getElementById("Student-js").elements["Confirm-Password"].value = "";

			upper_s.classList.remove("correct"); 
			upper_s.classList.add("not-correct");
			
			digit_s.classList.remove("correct"); 
			digit_s.classList.add("not-correct"); 
	
			char_s.classList.remove("correct"); 
			char_s.classList.add("not-correct"); 
		}

		/* 
		Display Error Messages
		*/

		/* Password Confirmation Popup */
		var popup_match = document.getElementById("no-match-s");
		if (pass_check)
		{
			/* Passwords did not match */
			if (current_visibility_confirm_S == false)
			{
				current_visibility_confirm_S = popup_match.classList.toggle("show");
			}
		}
		else if (!pass_check)
		{
			/* If passwords match disable popup */
			if (current_visibility_confirm_S == true)
			{
				current_visibility_confirm_S = popup_match.classList.toggle("show");
			}
		}

		/* Passowrd Requirements popup */
		var popup_req = document.getElementById("no-req-s");
		if (requirements)
		{
			/* password didnt meet requirements */
			if (current_visibility_requirements_s == false)
			{
				current_visibility_requirements_s = popup_req.classList.toggle("show");
			}
		}
		else if (!requirements)
		{	
			if (current_visibility_requirements_s == true)
			{
				current_visibility_requirements_s = popup_req.classList.toggle("show");
			}
		}

		/* Drop Down requirements popup */
		var popup_drop = document.getElementById("no-option-s");
		if (drop_check)
		{
			/* User did not select a valid option */
			if (current_visibility_dropdown_s == false)
			{
				current_visibility_dropdown_s = popup_drop.classList.toggle("show");
			}
			
		}
		else if (!drop_check)
		{
			if (current_visibility_dropdown_s == true)
			{
				current_visibility_dropdown_s = popup_drop.classList.toggle("show");
			}
		}

		/* If there is any error do not submit form to database and return */
		return;
	}

	console.log("Student form Met requirements to submit");


	/* database/server requests */
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/student_registration", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.response);
			//Check if email is unique
			if (response.unique[0].exists) {
				alert("The email you entered has already been registered")
			}
			else {
				// Callback used to redirect user to homepage after inserting data into database
				window.sessionStorage.setItem('userID', response.id[0].id)
				window.sessionStorage.setItem('userType', 's')
				callback()
			}
		}
	}
	xmlhttp.send(JSON.stringify({name:Name.value, username:User_name.value, email:Email.value, year:Year.value, major: Major.value, birthday:Birthday.value, password:Password.value, confirm_password:Confirm_Password.value}));
	
}

var current_visibility_confirm_r = false; /* For  keeping track of password confirm popup on S form */
var current_visibility_requirements_r = false; /* for keeping track of password req popup on S form */
function researcher_form_called(callback)
{
	var Email = document.getElementById("Researcher-js").elements["Email"];
	var Name = document.getElementById("Researcher-js").elements["Name"];
	var Password = document.getElementById("Researcher-js").elements["Password"];
	var Confirm_Password = document.getElementById("Researcher-js").elements["Confirm-Password"];

	var requirements = (digit_r.classList == "not-correct" || upper_r.classList == "not-correct" || char_r.classList == "not-correct");
	var pass_check = (Password.value != Confirm_Password.value);
	if (pass_check || requirements)
	{
		/* Clear password input fields */
		document.getElementById("Researcher-js").elements["Password"].value = "";
		document.getElementById("Researcher-js").elements["Confirm-Password"].value = "";

		upper_r.classList.remove("correct"); 
		upper_r.classList.add("not-correct");
		
		digit_r.classList.remove("correct"); 
		digit_r.classList.add("not-correct"); 

		char_r.classList.remove("correct"); 
		char_r.classList.add("not-correct"); 
		

		/* 
		Display Error Messages
		*/

		/* Password Confirmation Popup */
		var popup_match = document.getElementById("no-match-r");
		if (pass_check)
		{
			/* Passwords did not match */
			if (current_visibility_confirm_r == false)
			{
				current_visibility_confirm_r = popup_match.classList.toggle("show");
			}
		}
		else if (!pass_check)
		{
			/* If passwords match disable popup */
			if (current_visibility_confirm_r == true)
			{
				current_visibility_confirm_r = popup_match.classList.toggle("show");
			}
		}

		/* Passowrd Requirements popup */
		var popup_req = document.getElementById("no-req-r");
		if (requirements)
		{
			/* password didnt meet requirements */
			if (current_visibility_requirements_r == false)
			{
				current_visibility_requirements_r = popup_req.classList.toggle("show");
			}
		}
		else if (!requirements)
		{	
			if (current_visibility_requirements_r == true)
			{
				current_visibility_requirements_r = popup_req.classList.toggle("show");
			}
		}

		/* If there is any error do not submit form to database and return */
		return;
	}

	console.log("Researcher form Met requirements to submit");

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/researcher_registration", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.response);
			//Check if email is unique
			if (response.unique[0].exists) {
				alert("The email you entered has already been registered")
			}
			else {
				// Callback used to redirect user to homepage after inserting data into database
				window.sessionStorage.setItem('userID', response.id[0].id)
				window.sessionStorage.setItem('userType', 'r')
				callback()
			}
		}
	}

	xmlhttp.send(JSON.stringify({name:Name.value, email:Email.value, password:Password.value, confirm_password:Confirm_Password.value}));
}

function toHomepage() {
	// redirects to homepage
	location.href = "/index.html";

}

function autoComplete(value) {
	//begin console logging here to see where autoComplete goes wrong
	var current = value;
	var currentMost = current.substring(0, current.length - 1);
	var charLast = current.charCodeAt(current.length - 1);
	var charNext = String.fromCharCode(1 + charLast);
	var retrieval_query = "select major, major_desc from majors where (major_desc >= '" + current + "' and major_desc < '" + currentMost + charNext + "') order by numSelected, major;";

	//major info retrieval from database
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/major_retrieve", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		console.log("Well?");
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.response);
			if (response) {
				for (i = 0; i < response.data.length; i++) {
					var id = "option" + (i+1);
					document.getElementById(id).value = "";
					document.getElementById(id).label = "";
					var result = JSON.parse(JSON.stringify(response.data[i].major)) + " - " + JSON.parse(JSON.stringify(response.data[i].major_desc));
					document.getElementById(id).value = JSON.parse(JSON.stringify(response.data[i].major));
					document.getElementById(id).label = result;
				}

			}
			else {
				console.log(err);
				console.log("LET ME GUESS");
			}

		}
	}
	xmlhttp.send(JSON.stringify({query:retrieval_query}));
	return ;
};