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
function student_form_called()
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

	/* Confirm Passwords */
	var requirements = (digit_s.classList == "not-correct" || upper_s.classList == "not-correct" || char_s.classList == "not-correct");
	var pass_check = (Password.value != Confirm_Password.value);
	if (pass_check || requirements)
	{
		console.log("popup-b");
		/* Clear password input fields */
		document.getElementById("Student-js").elements["Password"].value = "";
		document.getElementById("Student-js").elements["Confirm-Password"].value = "";

		/* Display Error Message*/
		if (pass_check)
		{
			console.log("popup");
			/* Passwords did not match */
			var popup = document.getElementById("no-match");
			popup.classList.toggle("show");
		}

		if (requirements)
		{
			console.log("req");
			/* password didnt meet requirements */
			upper_s.classList.remove("correct"); 
			upper_s.classList.add("not-correct");
			
			digit_s.classList.remove("correct"); 
            digit_s.classList.add("not-correct"); 

			char_s.classList.remove("correct"); 
			char_s.classList.add("not-correct"); 
			/*Do popup stuff here */
		}
		return;
	}

	/* database/server requests */
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://localhost:3000/user_registration", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			
		}
	}
	xmlhttp.send(JSON.stringify({name:Name.value, username:User_name.value, email:Email.value, year:Year.value, birthday:Birthday.value, password:Password.value, confirm_password:Confirm_Password.value}));
	//redirect to homepage
	//location.href = "file:///home/luke/Documents/CSCI3308_106-4-ReSearch-App/ReSearch/views/index.html";
}

function researcher_form_called()
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
			console.log(this.response)
			
		}
	}
	xmlhttp.send(JSON.stringify({name:Name.value, email:Email.value, password:Password.value, confirm_password:Confirm_Password.value}));
}