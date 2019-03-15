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

function student_form_called()
{
	/*
	going to have to manually insert student value
	*/
	Name = document.getElementById("Student-js").elements["Name"];
	User_name = document.getElementById("Student-js").elements["User-name"];
	Email = document.getElementById("Student-js").elements["Email"];
	Year = document.getElementById("Student-js").elements["Year"];
	Birthday = document.getElementById("Student-js").elements["Birthday"];
	Password = document.getElementById("Student-js").elements["Password"];
	Confirm_Password = document.getElementById("Student-js").elements["Confirm-Password"];

	console.log("Student Called: \n Name: " + Name.value + "\n User-name: " + User_name.value +
	"\n Email: " + Email.value + "\n Year: "+ Year.value + "\n Birthday: "
	+ Birthday.value + "\n Password: "+ Password.value + "\n Confirm_Password: "
	+ Confirm_Password.value);

	alert("Student Name: " + Name.value + "\n User-name: " + User_name.value +
	"\n Email: " + Email.value + "\n Year: "+ Year.value + "\n Birthday: "
	+ Birthday.value + "\n Password: "+ Password.value + "\n Confirm_Password: "
	+ Confirm_Password.value);
}

function researcher_form_called()
{
	/*
	going to have to manually insert the researcher value
	*/
	Email = document.getElementById("Researcher-js").elements["Email"];
	Name = document.getElementById("Researcher-js").elements["Name"];
	Password = document.getElementById("Researcher-js").elements["Password"];
	Confirm_Password = document.getElementById("Researcher-js").elements["Confirm-Password"];

	console.log("Researcher called: \n Email: " + Email.value + "\n Name: " + Name.value +
	"\n Password: " + Password.value + "\n Confirm_Password: " + Confirm_Password.value);

	alert("Researcher Email: "+ Email.value + "\n Name: " + Name.value +
	"\n Password: " + Password.value + "\n Confirm_Password: " + Confirm_Password.value);
}