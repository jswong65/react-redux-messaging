const mongoose = require('mongoose');
//Connect to mongoDB
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL);

const models = {
	user:{
		'username': {type:String, require:true},
		'passwd': {type:String, require:true},
		'type': {type:String, require:true},
		'avatar': {'type':String},
		'desc': {'type':String},
		'major': {'type':String},
		'year': {'type':String}
	},
	chat:{

	}
};

for (let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name);
	}
}