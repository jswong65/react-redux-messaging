const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../models/user');
const { app } = require('../../server');
const { users, populateUsers } = require('../seed/seed');

const ObjectId = mongoose.Types.ObjectId;

// clear the database before every request
beforeEach(populateUsers);

// test for POST users/signup
describe('POST users/signup', () => {
    it("should create a new user", (done) => {
        let auth = {username: "testuser", password: "testPass", is_tutor: true};
        request(app)
          .post('/user/signup')
          .send(auth)
          .expect(200)
          .expect(response =>{
              expect(response.body.username).toBe(auth.username);
              expect(response.body.is_tutor).toBe(true);
          })
          .end((error, response) => {
              if (error) {
                  return done(error);
              }

              User.find({username: auth.username})
                .then( users => {
                    expect(users.length).toBe(1);
                    expect(users[0].username).toBe('testuser');
                    done();
              }).catch(
                  (err) => done(err)
              );
          });
    });

    it("should not create a new user when usernames exists", (done) => {
        let auth = {username: "qoo", password: "testPass", is_tutor: true};
        let msg = 'Username is in use!';
        request(app)
          .post('/user/signup')
          .send(auth)
          .expect(409)
          .end((error, response) => {
              if (error) {
                  return done(error);
              }

              expect(response.body.msg).toBe(msg);
              done();
          });
    });
})
