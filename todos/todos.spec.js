const chai = require('chai');
const request = require('supertest');
const app = require('../server');

const expect = chai.expect;

describe('Todos', () => {
  it('GET /todos', done => {
    request(app)
      .get('/api/todos')
      .expect(200)
      .end(done);
  });

  it('GET /todos/:id', () => {

  });

  it('POST /todos', () => {

  });

  it('PUT /todos/:id', () => {

  });

  describe('DELETE /todos/:id', () => {

  });
});
