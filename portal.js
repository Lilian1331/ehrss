

class Portal{

	constructor(){
		this.userId = "";
		this.userDisplayName = "";
		this.users = require('./users').items;
	}

	
	login(email, pw){
		//request user block
		//save to session
		if(this.findUser(this.users,email,pw)){
			var result = [];
			console.log("User " + this.userDisplayName + " logged in at " + new Date() + ".....");
			result["userDisplayName"] = this.userDisplayName;
			console.log(this.userId);
			result["userId"] = this.userId;
			return result;
		}else{
			console.log("failed to login");
			return result;
		}
	}

	findUser(users,email,pw){
		console.log("Checking user credential.....");
		var self = this;
		return users.find(function(item){
			if(item.email === email && item.password === pw){
				self.userId = item.id;
				self.userDisplayName = item.name;
				return true;
			}else{
				return false;
			}
		});
	}

	getUserInfo(userId){
		console.log("Fetching from ledger.....");
		var self = this;
		return this.users.find(function(item){
			if(item.id === userId){
				console.log("Returning user info back to client");
				return true;
			}else{
				return false;
			}
		});
	}

}
/*
function findUser(users, email, password){
	console.log("start check.....");
	console.log(users);
	return users.find(function(item){
		if(item.email === email && item.password === password){
			this.userDisplayName = item.name;
			return true;
		}else{
			return false;
		}
		//return item.email === email && item.password === password;
	});
}*/

module.exports = Portal



