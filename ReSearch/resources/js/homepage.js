function loadHomepage() {
	var xmlhttp = new XMLHttpRequest();  
  if (window.sessionStorage.getItem('userType') == 's') {
    xmlhttp.open("POST", "http://localhost:3000/load_homepage_student", true);
  }
  else {
    xmlhttp.open("POST", "http://localhost:3000/load_homepage_researcher", true);
  }
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	// console.log(this.response)
    	response = JSON.parse(this.response);
      alert(JSON.stringify(response.name[0].name));
    }
  };
  var userID = window.sessionStorage.getItem('userID')
  xmlhttp.send(JSON.stringify({userID: userID}));
}