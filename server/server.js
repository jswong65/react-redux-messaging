const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// create an app
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('sendMsg', (data) => {
		const { from, to, msg } = data
		const chatId = [from, to].sort().join('_');
		Chat.create({ chatId, from , to, content:msg }, (err, doc) => {
			io.emit('recvmsg', Object.assign({}, doc._doc));
		});
	})
});

const userRouter = require('./user');
const models = require('./model');
const Chat = models.getModel('chat');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(9093, () => {
	console.log('Node app start at port 9093')
});