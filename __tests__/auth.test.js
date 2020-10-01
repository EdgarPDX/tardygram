const { getAgent } = require('../data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');




describe('tardygram routes', () => {
  

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
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email:'test1@tester.com',
        password: 'password1'
      });

    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test1@tester.com',
      profilePhotoURL: 'https://www.placecage.com/200/300'
    });
  });

  it('Verify user using GET', async()  => {
    const agent = await getAgent();
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test1@test.com',
        password: 'password1',
        profilePhotoURL:'https://www.placecage.com/200/300'
      });

    const response = await agent
      .get('/api/v1/auth/verify');

    expect(response.body).toEqual({
      userId: expect.any(String),
      email: 'test1@test.com',
      profilePhotoURL: 'https://www.placecage.com/200/300'
    });

    
  });

});
