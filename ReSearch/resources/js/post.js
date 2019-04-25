function post_submit(callback) {
	var title = document.getElementById("title");
	var school = document.getElementById("school");
	var city = document.getElementById("city");
	var state = document.getElementById("state");
	var zip = document.getElementById("zip");
	var body = document.getElementById("body");
	var major = document.getElementById("major");
	var student_type = document.getElementById("student-type");
	var app_open = document.getElementById("app-open");
	var app_close = document.getElementById("app-close");
	var start_date = document.getElementById("start-date");
	var end_date = document.getElementById("end-date");
	var contact_name = document.getElementById("contact-name");
	var contact_email = document.getElementById("contact-email");
	var contact_phone = document.getElementById("contact-phone");
	var contact_fax = document.getElementById("contact-fax");

	/* database/server requests */
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", "/post_submit", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//response = JSON.parse(this.response);
			callback()
		}
	}
	xmlhttp.send(JSON.stringify({title:title.value, school:school.value, city:city.value, state:state.value, zip:zip.value, 
									body:body.value, major:major.value, student_type:student_type.value, app_open:app_open.value, app_close:app_close.value, start_date:start_date.value, end_date:end_date.value,
									contact_name:contact_name.value, contact_email:contact_email.value, contact_phone:contact_phone.value, contact_fax:contact_fax.value}));
}

function toHomepage() {
	// redirects to homepage
	location.href = "/index.html";
}