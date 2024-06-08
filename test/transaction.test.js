const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const { generateRandomEmail } = require('../utils/utils');

describe('Transaction Management', () => {
  let token;
  let user_id;
  let transactionId;

  before(async () => {
    // Connect to the database before running tests
    await mongoose.connect('mongodb://localhost/financial_tracker', { useNewUrlParser: true, useUnifiedTopology: true });
    const email = generateRandomEmail()
    // Create a user and get the token
    await request(app)
      .post('/v1/user/register')
      .send({
        firstname: 'Jane',
        lastname: 'Doe',
        email: email,
        password: 'password123'
      });

    const res = await request(app)
      .post('/v1/user/login')
      .send({
        email: email,
        password: 'password123'
      });
    token = res.body.token;
  });

  after(async () => {
    // Close the connection after running tests
    await mongoose.connection.close();
  });

  it('should add a new transaction', (done) => {
    request(app)
      .post('/v1/transaction')
      .set('Authorization', token)
      .send({
        title: 'Salary',
        description: 'Monthly salary',
        amount: 5000,
        currency: 'USD',
        dateTime: new Date(),
        category: 'food',
        type: 'income',
        user_id: '66642e46a73b446550c4b042'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        transactionId = res.body.transaction._id;
        done();
      });
  });

  it('should get a list of transactions', (done) => {
    request(app)
      .get('/v1/transactions')
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should get details of a transaction', (done) => {
    request(app)
      .get(`/v1/transaction/${transactionId}`)
      .set('Authorization', token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  })

  it('should update details of a transaction', (done) => {
    request(app)
      .put(`/v1/transaction/${transactionId}`)
      .set('Authorization', token)
      .send({
        title: 'Coffee',
        description: 'Coffee at starbuck',
        amount: 300,
        currency: 'INR',
        dateTime: new Date(),
        category: 'food',
        type: 'expense',
        user_id: '66642e46a73b446550c4b042'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  })

});
