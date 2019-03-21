var express = require('express'); //Ensure our express framework has been added
var app = express();
var cors = require('cors') 
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var jsonParser = bodyParser.json() // this is the depenency that you need to parse the requst of the form Application/Json
app.use(cors())
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var pgp = require('pg-promise')();

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'research_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);


app.post('/user_registration/send_form',jsonParser, function(req, res, next) { 
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.confirm_password;
	var birthday = req.body.birthday;
	var year = req.body.year;

	var insert_query = "INSERT INTO user_profiles(name, email, username, password, birthday, year) " + 
                        "VALUES('"+name+"', '"+email+"','"+username+"' , '"+password+"', '"+birthday+"', '"+year+"') ON CONFLICT DO NOTHING;";

	var all_profiles = 'select * from user_profiles;';
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_query),
            task.any(all_profiles)
        ]);
    })
    .then(info => {
    	res.send({
				my_title: "User Registration",
				data: info[1]
			})
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            my_title: 'User Registration',
            data: ''
        })
    });
});



app.listen(3000);
console.log('3000 is the magic port');