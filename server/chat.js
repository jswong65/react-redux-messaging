const express = require('express')
const Router = express.Router();
const models = require('./model');
const Chat = models.getModel('chat');
const User = models.getModel('user');

// get msg list from a user (either sent or received)
Router.get('/users', (req, res) => {;
	const { type } = req.query;
	User.find({ type }, (err, doc) => {
		return res.json({ code:0, data:doc });
	});
});

Router.get('/messages', (req, res) => {
	const userid = req.cookies.userid;
	let users = {};
	// retrieve user list
	User.find({}, (err, userdoc) => {
		userdoc.forEach( val => {
			users[val._id] = { username:val.username, avatar:val.avatar };
		});
	});
	Chat.find({'$or':[{ from:userid }, { to:userid }]}, (err, doc) => {
		if (!err) {
			return res.json({ code:0, msgs:doc, users });
		}
		return res.json({ code:1 });
	});
}).put('/messages', (req, res) => {
	const userid = req.cookies.userid;
	const { fromId } = req.body;
	Chat.update(
			{ from:fromId, to:userid }, 
			{ '$set': { has_read:true } }, 
			{ 'multi': true },
			(err, doc) => {
		if (!err) {
			return res.json({ code:0, num:doc.nModified });
		}
		return res.json({ code:1 })
	});
});

module.exports = Router;