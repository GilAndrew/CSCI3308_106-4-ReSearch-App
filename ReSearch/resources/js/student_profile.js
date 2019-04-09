/* For Profile Picture */
$(document).ready(function() {

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});

function Sample_Populate()
{
    console.log("In Sample_Populate");
    

    var Email = "sample@sample.com";
    var Username = "Sample_Username";
    var Birthdate = "01/02/2003";
    var Year = "Junior";
    var Name = "Douglas Thomas";

    document.getElementById("Email").innerHTML = Email;
    document.getElementById("Birthdate").innerHTML = Birthdate;
    document.getElementById("Year").innerHTML = Year;
    document.getElementById("Username").innerHTML = Username;
    document.getElementById("Name").innerHTML = Name;
}

function edit_profile(id, toggle)
{
    console.log("In edit_profile");
    if(toggle == 0)
	{
		document.getElementById(id).style.visibility = "hidden";
		document.getElementById(id).style.height = "0px";
	}

	if(toggle == 1)
	{
		document.getElementById(id).style.visibility = "visible";
		document.getElementById(id).style.height = "auto";
	}	
}

function headingToEdit()
{
    //populate place Holders with individuals information
}

function headingToProfile()
{
    //going to be similar to submit form for registration + update the data on profile page
}