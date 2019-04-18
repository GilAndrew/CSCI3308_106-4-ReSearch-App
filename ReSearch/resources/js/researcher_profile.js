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
  document.getElementById("Research_Info").innerHTML = document.getElementById("Research_Info_Edit").value;
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
