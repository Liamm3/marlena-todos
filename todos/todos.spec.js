const chai = require('chai');
const request = require('supertest');
const app = require('../server');
const populateTodos = require('./seed');

const expect = chai.expect;

beforeEach(populateTodos);

describe('Todos', () => {
  describe('GET /todos', () => {
    it('should get all todos', done => {
      request(app)
        .get('/api/todos')
        .expect(200)
        .end(done);
  });

  describe('GET /todos/:id', () => {

  });

  describe('POST /todos', () => {

  });

  describe('PUT /todos/:id', () => {

  });

  describe('DELETE /todos/:id', () => {

  });
});
