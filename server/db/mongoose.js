const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI);
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL);

module.exports = {
  mongoose
}
