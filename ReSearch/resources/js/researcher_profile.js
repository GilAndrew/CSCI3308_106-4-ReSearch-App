var edit_name = "";
var edit_email = "";
var edit_phone = "";
var edit_info = "";

function load_profile() { 
  var name = document.getElementById("Name");
  var username = document.getElementById("Username");
  var email = document.getElementById("Email");
  var phone = document.getElementById("Phone");
  var info = document.getElementById("Research_Info");

  var xmlhttp = new XMLHttpRequest();  
  xmlhttp.open("POST", "/retrieve_researcher_profile", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.response)
      var response = JSON.parse(this.response);
      
      edit_name = response.profile[0].name;
      edit_email = response.profile[0].email;
      edit_phone = response.profile[0].phone;
      edit_info = response.profile[0].description;

      name.innerHTML = response.profile[0].name;
      username.innerHTML = response.profile[0].name;
      email.innerHTML = response.profile[0].email;
      phone.innerHTML = response.profile[0].phone;
      info.innerHTML = response.profile[0].description;

    }
      
  };
  var userID = window.sessionStorage.getItem('userID')
  xmlhttp.send(JSON.stringify({userID: userID}));
}

function change_tab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function edit_profile() {
  document.getElementById("info_page").style.visibility = "hidden";
  document.getElementById("edit_page").style.visibility = "visible";
  document.getElementById("info_page").style.padding = "0px 0px 0px 0px";
  document.getElementById("info_page").style.border = "0px 0px 0px 0px";
  document.getElementById("info_page").style.height = "0px";
  document.getElementById("info_page").style.width = "0px";
  document.getElementById("edit_page").style.paddingTop = "38.578px";
  document.getElementById("edit_page").style.paddingBottom = "38.578px";
  document.getElementById("edit_page").style.paddingLeft = "38.578px";
  document.getElementById("edit_page").style.paddingRight = "38.578px";
  document.getElementById("edit_page").style.border = "0px";
  document.getElementById("edit_page").style.width = "822.844px";
  document.getElementById("edit_page").style.height = "360px";
  var researcher_name = document.getElementById("edit_page_name");
  researcher_name.innerHTML = edit_name;

  document.getElementById("edit_Username").value = edit_name;
  document.getElementById("edit_Email").value = edit_email;
  document.getElementById("edit_Phone").value = edit_phone;
  document.getElementById("edit_Info").value = edit_info;

}

function save_changes() {
  document.getElementById("edit_page").style.padding = "0px 0px 0px 0px";
  document.getElementById("edit_page").style.border = "0px 0px 0px 0px";
  document.getElementById("edit_page").style.height = "0px";
  document.getElementById("edit_page").style.width = "0px";
  document.getElementById("info_page").style.paddingTop = "38.578px";
  document.getElementById("info_page").style.paddingBottom = "38.578px";
  document.getElementById("info_page").style.paddingLeft = "38.578px";
  document.getElementById("info_page").style.paddingRight = "38.578px";
  document.getElementById("info_page").style.border = "0px";
  document.getElementById("info_page").style.width = "822.844px";
  document.getElementById("info_page").style.height = "360px";
  document.getElementById("info_page").style.visibility = "visible";
  document.getElementById("edit_page").style.visibility = "hidden";
  document.getElementById("edit_page_name").innerHTML = document.getElementById("edit_Username").value;
  document.getElementById("Name").innerHTML = document.getElementById("edit_Username").value;
  document.getElementById("Username").innerHTML = document.getElementById("edit_Username").value;
  document.getElementById("Email").innerHTML = document.getElementById("edit_Email").value;
  document.getElementById("Phone").innerHTML = document.getElementById("edit_Phone").value;
  document.getElementById("Research_Info").innerHTML = document.getElementById("edit_Info").value;

  var name = document.getElementById("edit_Username");
  var email = document.getElementById("edit_Email");
  var phone = document.getElementById("edit_Phone");
  var info = document.getElementById("edit_Info");

  console.log(name, email, phone, info);

  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/update_researcher_profile", true);
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
  xmlhttp.send(JSON.stringify({name:name.value, email:email.value, phone:phone.value, info:info.value, userID: userID}));
}

function hide() {
  document.getElementById("edit_page").style.visibility = "hidden";
}

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
