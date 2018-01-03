const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user'); 
const Chat = models.getModel('chat');
const _filter = { 'passwd':0, '__v':0 };

Router.get('/list', (req, res) => {
	const { type } = req.query;
	User.find({ type }, (err, doc) => {
		return res.json({ code:0, data:doc });
	});
});
// get msg list from a user (either sent or received)
Router.get('/msglist', (req, res) => {
	const userid = req.cookies.userid;
	let users = {}
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
})
Router.post('/readmsg', (req, res) => {
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
Router.post('/update', (req, res) => {
	const userid = req.cookies.userid;
	if (!userid) {
		return res.json({ code:1, msg:'update failed' })
	}
	const body = req.body;
	User.findByIdAndUpdate(userid, body, (err, doc) =>{
		const data = Object.assign({}, {
			username:doc.username,
			type:doc.type
		}, body);
		return res.json({ code:0, data });
	})
})
Router.post('/login', (req, res) => {
	const {username, passwd} = req.body;
	User.findOne({username, passwd:md5Passwd(passwd)}, _filter, (err, doc) => {
		if (!doc) {
			return res.json({ code:1, msg:'username and password do not match!' });
		}
		res.cookie('userid', doc._id);
		return res.json({ code:0, data:doc });
	});
});
Router.post('/register', (req, res) => {
	const {username, passwd, type} = req.body;
	User.findOne({username:username}, (err, doc) => {
		if (doc) {
			return res.json({code:1, msg:'user already exists'});
		}
		const userModel = new User({username, type, passwd:md5Passwd(passwd)});
		userModel.save((err, doc) => {
			if (err) {
				return res.json({code:1, msg:'something wrong!'});
			}
			const {user, type, _id} = doc;
			res.cookie('userid', _id);
			return res.json({code:0, data:{user, type, _id}});
		});
	})
});
Router.get('/info', (req, res) => {
	const { userid } = req.cookies;
	// check user has cookie or not
	if (!userid) {
		return res.json({code:1});
	}
	User.findOne({_id:userid}, _filter, (err, doc) => {
		if (err) {
			return res.json({code:1, msg:'something wrong!'});
		}
		if (doc) {
			return res.json({code:0, data:doc});
		}
	});
	
});

const md5Passwd = (passwd) => {
	const salt = "34t321g3s5d4745%&$%hy41564%^*^(*&";
	return utils.md5(utils.md5(passwd + salt));
};

module.exports = Router;