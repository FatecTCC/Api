var mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

module.exports = function(){
	mongoose.connect("mongodb://10.0.0.14:27017/cliente", { useNewUrlParser: true });
	mongoose.connection.once('open', function(){
		console.log("Connection has beem made, now make fireworks!");
	}).on('error', function(error){
		console.log("Connection error: ", error);
	});
}

