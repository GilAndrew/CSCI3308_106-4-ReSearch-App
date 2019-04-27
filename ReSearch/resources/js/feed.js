function populateFeed() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.open("POST", "/populate_feed", true);
    xhttp.setRequestHeader("Content-Type", "application/json"); 
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	// console.log(this.response)
    	response = JSON.parse(this.response);
        var majorPosts = "";
    	var otherPosts = "";
        console.log("Major: " + response.major.major)
    	response.postings.forEach(post => {
            if (post.major == response.major.major) {
                majorPosts += makeCard(post);
            }
            else {
                otherPosts += makeCard(post);
            }
    	})
        var allPosts = majorPosts + otherPosts;
      document.getElementById("feed").innerHTML += allPosts;
    }
  };

  var userID = window.sessionStorage.getItem('userID')
  var userType = window.sessionStorage.getItem('userType')
  xhttp.send(JSON.stringify({userID: userID, userType: userType}));
}

function makeCard(post) {
	var card = "";
    card = '<div class="col-xl-4 col-lg-4">' +
        '<div class="card">' +
            '<div class="card-header py-3 card_title">' +
                '<h6 class="m-0 font-weight-bold">'+post.title+'</h6>' +
            '</div>' +
            '<div class="card-body card_body">' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-6">' +
                        '<label for="title">'+post.school+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6">' +
                        '<label for="location">'+post.city+', '+post.state+' '+post.zip+'</label>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-6">' +
                        '<label for="major">Major: '+post.major+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6">' +
                        '<label for="applicant">Target Applicants: Undergraduate</label>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-12">' +
                        '<label for="body">'+post.body+'</label>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-6">' +
                        '<label for="app_open">App Opens: '+post.app_open.slice(0,10)+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6">' +
                        '<label for="app_close">App Closes: '+post.app_close.slice(0,10)+'</label>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row row_above_hr">' +
                    '<div class="form-group col-md-6 row_above_hr">' +
                        '<label for="start">Research Starts: '+post.start_date.slice(0,10)+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6 row_above_hr">' +
                        '<label for="end">Research Ends: '+post.end_date.slice(0,10)+'</label>' +
                    '</div>' +
                '</div>' +
                '<hr>' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-6">' +
                        '<label for="contact_name">'+post.contact_name+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6">' +
                        '<label for="contact_email">'+post.contact_email+'</label>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group col-md-6 row_above_hr">' +
                        '<label for="contact_phone">Phone: '+post.contact_phone+'</label>' +
                    '</div>' +
                    '<div class="form-group col-md-6 row_above_hr">' +
                        '<label for="contact_fax">Fax: '+post.contact_fax+'</label>' +
                    '</div>' +
                '</div>' +
                '<hr>' +
                '<div class="end_statement">' +
                    '<h6>Live and Learn as if you were to live forever.</h6>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<br>' +
    '</div>';

    return card;
}