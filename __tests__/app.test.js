const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');


describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signup for a user using POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoURL:'https://www.placecage.com/200/300'
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      profilePhotoURL:'https://www.placecage.com/200/300'
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password1',
      profilePhotoURL: 'https://www.placecage.com/200/300'
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email:'test@test.com',
        password: 'password1'
      });

    expect(response.body).toEqual({
      userId: user.userId,
      email: 'test@test.com',
      profilePhotoURL: 'https://www.placecage.com/200/300'
    });
  });

});
