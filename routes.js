var express = require("express");
var router = express.Router();

var Portal = require("./portal");
var UserDB = require("./userDB");

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

router.post('/sharepoint',function(req,res){
	console.log("OMG! I got you babe.");
	res.json({msg:"Yeah! i got the post request"});
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