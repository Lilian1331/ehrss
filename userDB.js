

class userDB{

	constructor(loginEmail, loginPW){
		this.userDisplayName = "";
		this.currentUserEmail = loginEmail;
		this.users = require('./users').items;
		return this.login(loginEmail, loginPW);
	}

	
	login(email, pw){
		//request user block
		//save to session
		if(this.findUser(this.users,email,pw)){
			var result = [];
			console.log("User " + this.userDisplayName + " logged in at " + new Date() + ".....");
			result["userDisplayName"] = this.userDisplayName;
			result["userId"] = "0001";
			return result;
		}else{
			console.log("failed to login");
			return result;
		}
	}

	findUser(users, email, password){
		console.log("Checking user credential.....");
		var self = this;
		console.log("DB: " + users);
		return users.find(function(item){
			if(item.email === email && item.password === password){
				self.userDisplayName = item.name;
				return true;
			}else{
				console.log("WTF!")
				return false;
			}
		});
	}

}

module.exports = userDB



