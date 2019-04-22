var express = require("express");
var router = express.Router();

var Portal = require("./portal");
var UserDB = require("./userDB");

var url = require("url");
var http = require("http");
var https = require("https");
var querystring = require('querystring');

const request = require('request');

router.get("/",function(req,res,next){
	console.log("I am on the start page.");
	res.render("index");
});

router.get("/login",function(req,res,next){
	console.log("I am on the login page.");
	res.render("login");
});

router.get('/clinical',function(req,res){
	console.log('Navigating to clinical site....');
	res.render("clinical",{userDisplayName:req.session.loginUser});
});

router.get('/sharepoint',function(req,res){
	console.log("Received request from sharepoint user.");
	console.log("Verify user " + req.query.requestType);
	console.log(req.query.requestType + " verified");
	console.log("Fetching " + req.query.patientId + " " + req.query.requestType +" from ledger.......");
	if(req.query.requestType == "PatientRecord"){
		request('http://localhost:3000/api/PatientRecord?filter={"where":{"patientId":"' + req.query.patientId + '"}}',{json:true},(err,ress,body)=>{
			if(err){return console.log(err);}
			console.log(ress);
			res.send(ress.body);
			//console.log(body.explanation);
		});
	}else{
		request('http://localhost:3000/api/PatientBooking?filter={"where":{"patientId":"' + req.query.patientId + '"}}',{json:true},(err,ress,body)=>{
			if(err){return console.log(err);}
			console.log(ress);
			res.send(ress.body);
			//console.log(body.explanation);
		});
	}
	
	//res.json({msg:"Yeah! i got the post request"});
})

router.post('/sharepointAdd',function(req,res){
	console.log("Received post request from sharepoint.");
	var data1 = querystring.stringify({
		"$class": "org.example.biznet.PatientBooking",
		"bookingId": "5",
		"Title": "Booking 5",
		"Insititution": "Happy",
		"Date": "Date 5",
		"patientId": "A123",
		"owner": "resource:org.example.biznet.Patient#1"
	});
	var data = querystring.stringify(req.body);
	console.log(querystring.stringify(req.body));
	//console.log("Data: " + data);
	
	var opt = {
		hostname: 'localhost',
		port: 3000,
		path: '/api/PatientBooking',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	}

	var reqq = http.request(opt,function(ress){
		ress.on('data',function(data){
			console.log(data.toString());
			res.send(ress.statusCode);
		})
	});
	reqq.on('error',function(e){
		console.log("error: " + e.message);
	})
	reqq.write(data);
	reqq.end();

})



router.post('/process',function(req,res){
	console.log('Email: ' + req.body.email);
	console.log('Password: ' + req.body.password);
	console.log("SESSION ID: " + req.sessionID);
	let t = new Portal();
	let result = t.login(req.body.email, req.body.password);
	if(t.userDisplayName != ''){
		req.session.userId = result.userId
		req.session.userDisplayName = result.userDisplayName;
		res.render("portal", {userDisplayName: req.session.userDisplayName + "**" ,lastLoginTime: result.userId });
	}else{
		res.json({ret_code: 1, ret_msg: '账号或密码错误'});
		console.log("failed!");
	}
})


router.get('/userInfo', function(req, res){
	// input value from search
	var val = req.query.search;
	console.log("Start fetching user info.....");
	let t = new Portal();
	res.send(t.getUserInfo(req.session.userId));

	// testing the route
	// res.send("WHEEE");
});

router.get('/searching', function(req, res){
	// input value from search
	var val = req.query.search;
	console.log(val);
	console.log("Sent to server side " + req.query.patientId);
	console.log("Sent to server side " + req.query.patientName);
	res.send(req.query.patientName);
});

router.get('/searching', function(req, res){
	// get user searchinf patient info
	var patientId = req.query.search;
	console.log(patientId);
	let t = new Portal();
	let record = t.getUserInfo(patientId);
	res.send(record);
});









module.exports = router;