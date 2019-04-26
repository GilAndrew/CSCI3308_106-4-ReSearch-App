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
function load_profile()
{ 
  var edit_name = document.getElementById("Edit-Name");
  var name = document.getElementById("Name");
  var username = document.getElementById("Username");
  var email = document.getElementById("Email");
  var year = document.getElementById("Year");
  var birthday = document.getElementById("Birthday");

  var xmlhttp = new XMLHttpRequest();  
  xmlhttp.open("POST", "/retrieve_student_profile", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.response)
      var response = JSON.parse(this.response);
      
      edit_name.innerHTML = response.profile[0].name;
      name.innerHTML = response.profile[0].name;
      username.innerHTML = response.profile[0].username;
      email.innerHTML = response.profile[0].email;
      year.innerHTML = response.profile[0].year;
      birthday.innerHTML = response.profile[0].birthday.slice(0, 10);

        Email = response.profile[0].email;
        Birthday = response.profile[0].birthday.slice(0, 10);
        Year = response.profile[0].year; //need to add conditionals so that FSH isnt displayed, but freshman
        Username = response.profile[0].username;
        Full_Name = response.profile[0].name;


    }
      
  };
  var userID = window.sessionStorage.getItem('userID')
  xmlhttp.send(JSON.stringify({userID: userID}));
}

/* Function is called when webpage load to set element to correct values,
and is called again one data is changed in edit function*/
function update_profile()
{
    console.log("Updating")
    Image = document.getElementById("edit-profile-js").elements["Edit-Image"];
    Email = document.getElementById("edit-profile-js").elements["Edit-Email"].value;
    Birthday = document.getElementById("edit-profile-js").elements["Edit-Birthday"].value;
    Year = document.getElementById("edit-profile-js").elements["Edit-Year"].value;
    Username = document.getElementById("edit-profile-js").elements["Edit-Username"].value;

    document.getElementById("Profile-Image").innerHTML = Image;
  document.getElementById("Username").innerHTML = Username;
  document.getElementById("Email").innerHTML = Email;
  document.getElementById("Year").innerHTML = Year;
  document.getElementById("Birthday").innerHTML = Birthday;


  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/update_student_profile", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.response);
      //Check if email is unique
      /*
      if (response.unique[0].exists) {
        alert("The email you entered has already been registered")
      }
      */
    }
  }

  var userID = window.sessionStorage.getItem('userID')
  xmlhttp.send(JSON.stringify({username:Username, email:Email, birthday:Birthday, year:Year, userID: userID}));
}

/* Deals with the visibility of each form */
function edit_profile(id, toggle)
{
    console.log("Toggling Visibility of Forms");
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

    document.getElementById("edit-profile-js").elements["Edit-Email"].value = Email;
    document.getElementById("edit-profile-js").elements["Edit-Birthday"].value = Birthday;
    document.getElementById("edit-profile-js").elements["Edit-Year"].value = Year;
    document.getElementById("edit-profile-js").elements["Edit-Username"].value = Username;
    console.log("Heading To Edit Form");

}

function headingToProfile()
{
    console.log("Save Edits function Called");

    /* Visibility Calls if data is good to sumbit */
    edit_profile('edit-profile',0); 
    edit_profile('profile',1);

}



