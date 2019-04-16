/* Handles Profile Picture Upload */
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

/*The Following Variables Should be initialised when the webpage loads by the database
values. They will be changed by the heading-to-profile function, which is called after edits are submitted*/
var Image = "https://pbs.twimg.com/media/DTJLmSAW4AIMBrg.jpg"; /* Probably would be best to set a default pic in DB when they register */
var Email = "idk@idk.com";
var Birthday = "10";
var Year = "Sophmore";
var Username = "Username";
var Full_Name = "Douglas Thomas";


/* Not sure how post operation work in JS, but this would be a good place to put
the function which Grabs the information from database on Load Up*/
function load_from_DB()
{

}

/* Function is called when webpage load to set element to correct values,
and is called again one data is changed in edit function*/
function get_correct_data()
{
    document.getElementById("Profile-Image").src = Image;
    document.getElementById("Email").innerHTML = Email;
    document.getElementById("Birthday").innerHTML = Birthday;
    document.getElementById("Year").innerHTML = Year;
    document.getElementById("Username").innerHTML = Username;
    document.getElementById("Name").innerHTML = Full_Name;
    console.log("Image: " + Image);
}

/* Deals with the visibility of each form */
function edit_profile(id, toggle)
{
    console.log("Toggling Visibility of Fourms");
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
    /* populate place Holders with individuals information */
    console.log("Heading To Edit Fourm");
}

function headingToProfile()
{
    console.log("Heading To Profile Fourm");
    Image = document.getElementById("Edit-Image").src;
    Email = document.getElementById("edit-profile-js").elements["Edit-Email"].value;
    Birthday = document.getElementById("edit-profile-js").elements["Edit-Birthday"].value;
    Year = document.getElementById("edit-profile-js").elements["Edit-Year"].value;
    Username = document.getElementById("edit-profile-js").elements["Edit-Username"].value;
    get_correct_data(); /* Will Update what the user see's imediately */

    /* These Updated Values should be sent and Stored In database Here...
     Note I will be adding JS similar to that of the register page, such that we 
     submit the correct data each time*/
}

