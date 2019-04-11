function post_submit() {
	var title = documents.getElementById("title");
	var school = documents.getElementById("school");
	var city = documents.getElementById("city");
	var state = documents.getElementById("state");
	var zip = documents.getElementById("zip");
	var body = documents.getElementById("body");
	var major = documents.getElementById("major");
	var app_open = documents.getElementById("app-open");
	var app_close = documents.getElementById("app-close");
	var start_date = documents.getElementById("start-date");
	var end_date = documents.getElementById("end-date");
	var contact_name = documents.getElementById("contact-name");
	var contact_email = documents.getElementById("contact-email");
	var contact_phone = documents.getElementById("contact-phone");
	var contact_fax = documents.getElementById("contact-fax");

	/* database/server requests */
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "http://localhost:3000/post_submit", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.response);
			
		}
	}
	xmlhttp.send(JSON.stringify({title:title.value, school:school.value, city:city.value, state:state.value, zip:zip.value, 
									body:body.value, major:major.value, app_open:app_open, app_close:app_close, start_date:start_date, end_date:end_date,
									contact_name:contact_name, contact_email:contact_email, contact_phone:contact_phone, contact_fax:contact_fax}));
}