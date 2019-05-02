# Team MADLADS - ReSearch

# Goal
Allow for “job” postings for subjects of university research opportunities. Allow professors
to post research opportunities and allow the students to search for potential research
opportunities that will work best for them based on a variety of factors, e.g. time commitment
and potential payment. The web app will match students with research opportunities based on a
variety of factors that will be a part of their student profile, e.g. year, major, and any other
possible preferences

# Slogan
Connecting Minds.

# Team Members
- Douglas Thomas
- Andrew Gilfillan
- Damien Beecroft
- Michael Rogers
- Alvaro Santillan
- Luke Soguero

# Team Meetings
Team will meet face-to-face once weekly on Thursdays after recitation. Each meeting will be
approximately two hours in length and will run from 1PM to 3PM. If the team has agreed to meet
after recitation that day, then after recitation, the team will head to a quiet meeting space in the
engineering building. Reserving specific meeting rooms has also been discussed if available
public tables at the engineering building become unavailable. Slack will also be used throughout
the week for digital communication.

# Repo Organization/Structure
Entirety of project is in the folder named ReSearch. The main ReSearch folder contains the package.json, README.md, Procfile, as well as the server.js (and local.js for localhost testing) There are also serveral .txt files that were used to create and configure the postgresql database and tables. The node_modules folder contains the modules,including bcrypt, express, and a variety of others, that are used in the server.js. The views folder contains the .html files of every page of the website. The resources folder contains subfolders the files for the app’s css, img resources, javascript files for individual pages, as well as several files to list the majors available at CU boulder. Within the subfolder that is also named resources, there are wireframes that are drafts/plans for the layout of the webpages of the app.

# How to use
To build/edit the code, if running locally, start the postgresql service in the background (sudo -u postgres service postgresql start), then run either local.js or server.js (node local.js OR node server.js), open the html file of choice. Note: local.js will only work if the page-specific js files are using the commented-out xmlhttp.open statements that configure the post requests for localhost.

To run the app, simply go to the herokuapp link above or heroku open in the command line.
