const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('signup for a user using POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoURL:'https://www.placecage.com/200/300'
      });
  })
});
