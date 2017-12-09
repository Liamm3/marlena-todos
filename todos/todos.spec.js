const chai = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const app = require('../server');
const { todos, populateTodos } = require('./seed');
const Todo = require('./model');

const expect = chai.expect;

beforeEach(populateTodos);

describe('Todos', () => {
  describe('GET /todos', () => {
    it('should get all todos', done => {
      request(app)
        .get('/api/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.todos).to.be.an('array');
          expect(res.body.todos.length).to.be.equal(2);
        })
        .end(done);
      });
  });

  describe('GET /todos/:id', () => {
    it('should find a todo by id', done => {
      request(app)
        .get(`/api/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .end(done);
    });

    it('should not find a not existent todo', done => {
      const hexId = new ObjectID().toHexString();
      request(app)
        .get(`/api/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should not find a not valid objectid', done => {
      request(app)
        .get('/api/todos/123')
        .expect(404)
        .end(done);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', done => {
      const text = 'new todo';
      request(app)
        .post('/api/todos')
        .send({ text })
        .expect(200)
        .expect(res => {
          expect(res.body.text).to.be.equal(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({}).then(todos => {
            expect(todos.length).to.be.equal(3);
            expect(todos[2].text).to.be.equal(text);
            done();
          }).catch(err => done(err));
        });
    });

    it('should not create invalid todos', done => {
      request(app)
        .post('/api/todos')
        .set({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
          }

          Todo.find({}).then(todos => {
            expect(todos.length).to.be.equal(2);
            done();
          }).catch(err => done(err));
        })
    });
  });

  describe('PUT /todos/:id', () => {

  });

  describe('DELETE /todos/:id', () => {

  });
});
