const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const User = require('../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
    _id: userOneId,
    username: 'abc',
    password: 'userOnePass'
}, {
    _id: userTwoId,
    username: 'qoo',
    password: 'userTwoPass'
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
      const userOne = new User(users[0]).save();
      const UserTwo = new User(users[1]).save();
  
      return Promise.all([userOne, UserTwo])
    }).then(() => done());
  };

module.exports = { users, populateUsers };