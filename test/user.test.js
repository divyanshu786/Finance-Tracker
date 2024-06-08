const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const { generateRandomEmail } = require('../utils/utils');

describe('User Management', () => {
  before(async () => {
    // Connect to the database before running tests
    await mongoose.connect('mongodb://localhost/financial_tracker', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Close the connection after running tests
    await mongoose.connection.close();
  });

  let token;
  const email = generateRandomEmail()

  it('should create a new user', (done) => {
    request(app)
      .post('/v1/user/register')
      .send({
        firstname: 'John',
        lastname: 'Singha',
        email: email,
        password: 'password123'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should log in a user', (done) => {
    email
    request(app)
      .post('/v1/user/login')
      .send({
        email: email,
        password: 'password123'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });
});
