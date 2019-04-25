function loadHomepage() { 
  // If a user is logged in
  if (window.sessionStorage.getItem('userType')) {

    loggedIn();

    var xmlhttp = new XMLHttpRequest(); 
    // Check if user is student or researcher
	  if (window.sessionStorage.getItem('userType') == 's') {
      xmlhttp.open("POST", "/load_homepage_student", true);
    }
    else {
      xmlhttp.open("POST", "/load_homepage_researcher", true);
    }

    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(this.response)
        response = JSON.parse(this.response);
        //alert(JSON.stringify(response.name[0].name));
        //Here we want to update the name on the homepage
        document.getElementById("profile_link").innerHTML += " " + response.name[0].name;
      }
    };
    // Retrieve user ID of current user
    var userID = window.sessionStorage.getItem('userID')
    xmlhttp.send(JSON.stringify({userID: userID}));
  }
  // If a user is not logged in
  else {
    loggedOut();
  }
}

function loggedIn() {
  // Show profile button on homepage
  document.getElementById("profile_link").style.visibility = "visible";
  document.getElementById("profile_link").style.width = "auto";

  // Remove log in and sign up buttons
  document.getElementById("login_link").style.visibility = "hidden";
  document.getElementById("login_link").style.height = "0px";

  document.getElementById("signin_link").style.visibility = "hidden";
  document.getElementById("signin_link").style.height = "0px";

  // Only show post option if user is a researcher
  if (window.sessionStorage.getItem('userType') == 's') {
    document.getElementById("post_link").style.display = "none";
  }
  else {
    document.getElementById("post_link").style.display = "initial";
  }
}

function loggedOut() {
  // Remove profile button from homepage
  document.getElementById("profile_link").style.visibility = "hidden";
  document.getElementById("profile_link").style.width = "0px";
  document.getElementById("profile_link").style.height = "0px";

  // Show log in and sign up buttons
  document.getElementById("login_link").style.visibility = "visible";
  document.getElementById("login_link").style.width = "auto";

  document.getElementById("signin_link").style.visibility = "visible";
  document.getElementById("signin_link").style.width = "auto";
}

function logout() {
  window.sessionStorage.clear();
  location.reload();
}