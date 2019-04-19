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
var Birthday = "01-01-2000";
var Year = "Sophmore"; //need to add conditionals so that FSH isnt displayed, but freshman
var Username = "Username";
var Full_Name = "Individuals Name";


/* Not sure how post operation work in JS, but this would be a good place to put
the function which Grabs the information from database on Load Up and
places data from DB into global variables above*/
function load_from_DB()
{ 
    console.log("this");
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
    //console.log("Image: " + Image);
    console.log("then this");
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
    /* populate place Holders with individuals information If time permits
    Ill add the functionality*/
    edit_profile('edit-profile',1); 
    edit_profile('profile',0); 
    document.getElementById("Edit-Image").src = Image;
    console.log("Heading To Edit Fourm");
}

function headingToProfile()
{
    console.log("Save Edits  fucntion Called");

    /* Set DOM Elements to temp variables before assigned to actual variables (excluding Image thats fine) */
    Image = document.getElementById("Edit-Image").src;
    /* Need to set the submit forms photo too on load up */
    Temp_Email = document.getElementById("edit-profile-js").elements["Edit-Email"].value;
    Temp_Birthday = document.getElementById("edit-profile-js").elements["Edit-Birthday"].value;
    Temp_Year = document.getElementById("edit-profile-js").elements["Edit-Year"].value;
    Temp_Username = document.getElementById("edit-profile-js").elements["Edit-Username"].value;
    
    /* Making sure data is clean (Only setting if real Input) */
    if (Temp_Email != ''){
        Email = Temp_Email;
    } 
    if (Temp_Year != 'Select Year of Education'){
        Year = Temp_Year;
    }
    if (Temp_Birthday != '2000-01-01'){
        Birthday = Temp_Birthday;
    }
    if (Temp_Username != ''){
        Username = Temp_Username;
    }

    console.log("Data Entry Succefull, will be entered to DB")
    get_correct_data(); /* Will Update what the user see's imediately  on page, dont have to get from DB every time, on on page load up*/

    /* Visibility Calls if data is good to sumbit */
    edit_profile('edit-profile',0); 
    edit_profile('profile',1);

    /* Clear input fields here since no page reload */
    document.getElementById("edit-profile-js").elements["Edit-Email"].value = '';
    document.getElementById("edit-profile-js").elements["Edit-Birthday"].value = '2000-01-01';
    document.getElementById("edit-profile-js").elements["Edit-Username"].value = '';
    $('#DropDown option').prop('selected', function() {
        return this.defaultSelected;
    });

    /* These Updated Values should be sent and Stored In database Here...*/
}



