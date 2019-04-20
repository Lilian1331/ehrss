var express = require('express');
var path = require("path");
var routes = require("./routes");
var bodyParser = require("body-parser");
const uuid = require('uuid/v4')
var session = require('express-session');


var app = express();


app.set("port", process.env.PORT || 3000);

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
	genid: (req) => {
	  console.log('Inside the session middleware')
	  console.log(req.sessionID)
	  return uuid() // use UUIDs for session IDs
	},
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;


app.use(routes);
app.use(express.static( "public" ));
app.use(express.static( "node_modules" ));
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
 	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
})


// parse application/x-www-form-urlencoded


app.listen(app.get("port"),function(){
	console.log("Server started on port " + app.get("port"));
})