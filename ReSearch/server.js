var express = require('express'); //Ensure our express framework has been added
var app = express();

// bcrypt
//var db = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// end bcrypt

//var session = require('express-session')
//var cookieParser = require('cookie-parser')
var cors = require('cors') 
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var jsonParser = bodyParser.json() // this is the depenency that you need to parse the requst of the form Application/Json
app.use(cors())
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use(cookieParser())

var pgp = require('pg-promise')();

//dbConfig for localhost, kept for archical/testing purposes
/*const dbConfig = {
	host: 'localhost',
	port: 5432, //5432
	database: 'research_db',
	user: 'postgres',
	password: 'newpassword' //newpassword
};*/

const dbConfig = process.env.DATABASE_URL;


var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/feed.html', function(req, res) {
    res.sendFile(__dirname + '/views/feed.html');
});

app.get('/post.html', function(req, res) {
    res.sendFile(__dirname + '/views/post.html');
});

app.get('/registration.html', function(req, res) {
    res.sendFile(__dirname + '/views/registration.html');
});

app.get('/researcher_profile.html', function(req,res) {
    res.sendFile(__dirname + '/views/researcher_profile.html');
});

app.get('/student_profile.html', function(req, res) {
    res.sendFile(__dirname + '/views/student_profile.html')
});


app.post('/student_registration',jsonParser, function(req, res, next) { 

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.confirm_password;
    var birthday = req.body.birthday;
    var year = req.body.year;
    var major = req.body.major;
    var hashed;

    bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            console.log(`Hash: ${hash}`);
            hashed = hash;
            console.log("HASHED: " + hashed);

            var unique_query = "SELECT EXISTS(SELECT 1 FROM user_profiles WHERE email='"+email+"');";

            var insert_query = "INSERT INTO user_profiles(name, email, username, password, birthday, year, major) " + 
                                "SELECT'"+name+"', '"+email+"','"+username+"' , '"+hashed+"', '"+birthday+"', '"+year+"', '"+major+"' WHERE " +
                                "NOT EXISTS (SELECT email FROM user_profiles WHERE email = '"+email+"') " +
                                "RETURNING id;";
        
            var increment_query = "UPDATE majors SET numSelected = numSelected + 1 WHERE major = '"+ major + "';";
            console.log("HASHED INSERT QUERY: " + insert_query);
            db.task('get-everything', task => {
                return task.batch([
                    task.any(unique_query),
                    task.any(insert_query),
                    task.any(increment_query)
                ]);
            })
            .then(info => {
                res.send({
                        unique: info[0],
                        id: info[1]
                    })
            })
            .catch(err => {
                // display error message in case an error
                console.log(err);
                res.send({
                    unique: '',
                    id: ''
                })
            });

        })
        .catch(err => console.error(err.message));
}); 

app.post('/researcher_registration',jsonParser, function(req, res, next) { 
    var name = req.body.name;
	var email = req.body.email;
    var password = req.body.confirm_password;
    var hashed;
    
    bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            console.log(`Hash: ${hash}`);
            hashed = hash;
            console.log("HASHED: " + hashed);
            var unique_query = "SELECT EXISTS(SELECT 1 FROM researcher_profiles where email='"+email+"');";
	        var insert_query = "INSERT INTO researcher_profiles(name, email, password) " + 
                        "SELECT '"+name+"', '"+email+"', '"+hashed+"' WHERE " +
                        "NOT EXISTS (SELECT email FROM researcher_profiles WHERE email = '"+email+"') " +
                        "RETURNING id;";
            db.task('get-everything', task => {
                return task.batch([
                    task.any(unique_query),
                    task.any(insert_query)
                ]);
            })
            .then(info => {
                res.send({
                    unique: info[0],
                    id: info[1]
                })
            })
            .catch(err => {
                // display error message in case an error
                console.log(err);
                res.send({
                    unique: '',
                    id: ''
                })
            });        
        })
        .catch(err => console.error(err.message));
});

app.post('/student_login',jsonParser, function(req, res, next) { 
	var email = req.body.email;
    var password = req.body.password;
    var retrieval_query = "SELECT password FROM user_profiles where email='"+email+"';";
    
    db.task('get-hash', task => {
        return task.batch([
            task.any(retrieval_query)
        ]);
    })
    .then(result => {
        console.log("RESULT: " + result[0][0].password);
        var hash = result[0][0].password;
        console.log("Hello: " + hash);
        bcrypt.compare(password, hash)
        .then(bool => {
            console.log("Response: " + bool);

            var validation_query = "select exists(select 1 from user_profiles where email='"+email+"' AND password='"+hash+"');";
            var user_id_query = "select id from user_profiles where email='"+email+"' AND password='"+hash+"';"
            db.task('get-everything', task => {
                return task.batch([
                    task.any(validation_query),
                    task.any(user_id_query)
                ]);
            })
            .then(info => {
                res.send({
                    inTable: info[0],
                    id: info[1]
                })
            })
            .catch(err => {
                // display error message in case an error
                console.log(err);
                res.send({
                    inTable: info[0],
                    id: info[1]
                })
            })
        })
        .catch(function (err) {
            console.log(err);
        })
    })
    .catch(function(err) {
        console.log(err);
    })
});

app.post('/researcher_login',jsonParser, function(req, res, next) { 
    var email = req.body.email;
    var password = req.body.password;
    var retrieval_query = "SELECT password FROM researcher_profiles where email='"+email+"';";

    db.task('get-hash', task => {
        return task.batch([
            task.any(retrieval_query)
        ]);
    })
    .then(result => {
        console.log("RESULT: " + result[0][0].password);
        var hash = result[0][0].password;
        console.log("HELLO: " + hash);
        bcrypt.compare(password, hash)
        .then(bool => {
            console.log("Response: " + bool);
            var validation_query = "select exists(select 1 from researcher_profiles where email='"+email+"' AND password='"+hash+"');";
            var user_id_query = "select id from researcher_profiles where email='"+email+"' AND password='"+hash+"';"
            db.task('get-everything', task => {
                return task.batch([
                    task.any(validation_query),
                    task.any(user_id_query)
                ]);
            }) 
            .then(info => {
                res.send({
                    inTable: info[0],
                    id: info[1]
                })
            })
            .catch(err => {
                // display error message in case an error
                console.log(err);
                res.send({
                    inTable: info[0],
                    id: info[1]
                })
            });
        })
        .catch(function (err) {
            console.log(err);
        })
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.post('/load_homepage_student', jsonParser, function(req, res, next) {
    var userID = req.body.userID;

    var name_query = "select name from user_profiles where id='"+userID+"';";

    db.task('get-everything', task => {
        return task.batch([
            task.any(name_query)
        ]);
    })
    .then(info => {
        res.send({
            name: info[0]
        })
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            name: info[0]
        })
    });
});

app.post('/load_homepage_researcher', jsonParser, function(req, res, next) {
    var userID = req.body.userID;

    var name_query = "select name from researcher_profiles where id='"+userID+"';";

    db.task('get-everything', task => {
        return task.batch([
            task.any(name_query)
        ]);
    })
    .then(info => {
        res.send({
            name: info[0]
        })
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            name: info[0]
        })
    });
});

app.post('/post_submit',jsonParser, function(req, res, next) { 

    var title = req.body.title;
    var school = req.body.school;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var body = req.body.body;
    var major = req.body.major;
    var app_open = req.body.app_open;
    var app_close = req.body.app_close;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var contact_name = req.body.contact_name;
    var contact_email = req.body.contact_email;
    var contact_phone = req.body.contact_phone;
    var contact_fax = req.body.contact_fax;

    var ownerProfile;
    bcrypt
        .hash(contact_email, saltRounds)
        .then(hash => {
            console.log(`Hash: ${hash}`);
            ownerProfile = hash;
            console.log("HASHED: " + ownerProfile);
            var insert_query = "INSERT INTO postings (ownerProfile, title, school, city, state, zip, body, major, app_open, app_close, " +
                        "start_date, end_date, contact_name, contact_email, contact_phone, contact_fax)" +
                        "VALUES ('"+ownerProfile+"', '"+title+"', '"+school+"', '"+city+"', '"+state+"', "+zip+", '"+body+"', '"+major+"', '"+app_open+"', '"+app_close+"', '" +
                        start_date+"', '"+end_date+"', '"+contact_name+"', '"+contact_email+"', '"+contact_phone+"', '"+contact_fax+"');"; 
            db.task('get-everything', task => {
                return task.batch([
                    task.any(insert_query)
                ]);
            })
            .then(info => {
                res.send({
                    data: ''
                })
            })
            .catch(err => {
                // display error message in case an error
                console.log(err);
                res.send({
                    data: ''
                })
            });            
        })
        .catch(err => console.error(err.message));
});


app.get('/populate_feed',jsonParser, function(req, res, next) { 

    var all_postings_query = "SELECT * FROM postings;";

    db.task('get-everything', task => {
        return task.batch([
            task.any(all_postings_query)
        ]);
    })
    .then(info => {
        res.send({
                postings: info[0]
        })          
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
          postings: ''
        })
    });
}); 

app.post('/major_retrieve',jsonParser, function(req, res, next) {
    var query = req.body.query;
    db.task('get-majors', task => {
        return task.batch([
            task.any(query)
        ]);
    })
    .then(info => {
        res.send({
            data: [info[0][0], info[0][1], info[0][2], info[0][3]]
        })
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            data: ''
        })
    });
});

app.post('/retrieve_researcher_profile',jsonParser, function(req, res, next) { 
    var userID = req.body.userID;

    var profile_query = "select * from researcher_profiles where id='"+userID+"';";

    db.task('get-everything', task => {
        return task.batch([
            task.any(profile_query)
        ]);
    })
    .then(info => {
        res.send({
                profile: info[0]
        })          
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
          profile: ''
        })
    });
}); 

app.post('/update_researcher_profile',jsonParser, function(req, res, next) { 
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var info = req.body.info;
    var userID = req.body.userID;

    var update_query = "UPDATE researcher_profiles SET " + 
                        "name = '"+name+"', email = '"+email+"', phone = '"+phone+"', description = '"+info+"' " +
                        "WHERE id = '"+userID+"'";

    db.task('get-everything', task => {
        return task.batch([
            task.any(update_query)
        ]);
    })
    .then(info => {
        res.send({
                unique: ''
            })
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            unique: ''
        })
    });
});

app.post('/retrieve_student_profile',jsonParser, function(req, res, next) { 
    var userID = req.body.userID;

    var profile_query = "select * from user_profiles where id='"+userID+"';";

    db.task('get-everything', task => {
        return task.batch([
            task.any(profile_query)
        ]);
    })
    .then(info => {
        res.send({
                profile: info[0]
        })          
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
          profile: ''
        })
    });
}); 

app.post('/update_student_profile',jsonParser, function(req, res, next) { 
    var username = req.body.username;
    var email = req.body.email;
    var year = req.body.year;
    var birthday = req.body.birthday;
    var userID = req.body.userID;

    console.log("In server")

    var update_query = "UPDATE user_profiles SET " + 
                        "username = '"+username+"', email = '"+email+"', year = '"+year+"', birthday = '"+birthday+"' " +
                        "WHERE id = '"+userID+"'";

    db.task('get-everything', task => {
        return task.batch([
            task.any(update_query)
        ]);
    })
    .then(info => {
        res.send({
                unique: ''
            })
    })
    .catch(err => {
        // display error message in case an error
        console.log(err);
        res.send({
            unique: ''
        })
    });
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
console.log('3000 is the magic port');