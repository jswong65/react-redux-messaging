const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the message model

const MessageSchema = new Schema({
    'chatId': { type: String, unique: true, require: true },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    'has_read':{ type: Boolean, default: false },
    'content': { type: String, require:true, deafult:'' },
    'createdAt': { type: Number, default: Date.now } 
});

// Create the model class
const Message = mongoose.model('message', MessageSchema);

// Export the model
module.exports = { Message };