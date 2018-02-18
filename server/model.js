const mongoose = require('mongoose');
//Connect to mongoDB
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL);

const Schema = mongoose.Schema;
const models = {
	user:{
		'username': { type:String, require:true },
		'passwd': { type:String, require:true },
		'type': { type:String, require:true },
		'avatar': { 'type':String },
		'display': { 'type':String },
		'title': { 'type':String },
		'subject': { 'type':String },
		'desc': { 'type':String },
		'major': { 'type':String },
		'year': { 'type':String }
	},
	chat:{
		'chatId': { 'type':String, require:true },
		'from': { type:String, require:true },
		'to': { type:String, require:true },
		'has_read':{ 'type':Boolean, default: false },
		'content': { type:String, require:true, deafult:'' },
		'create_time': { type:Number, default: Date.now } 
	}
};

for (let m in models){
	mongoose.model(m, new Schema(models[m]));
}

module.exports = {
	getModel: (name) => {
		return mongoose.model(name);
	}
}