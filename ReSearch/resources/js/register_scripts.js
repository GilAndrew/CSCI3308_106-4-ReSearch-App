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
	console.log("student called");
	alert("The student form was submitted");
}

function researcher_form_called()
{
	/*
	going to have to manually insert the researcher value
	*/
	console.log("researcher called");
	alert("The  researcher form was submitted");
}