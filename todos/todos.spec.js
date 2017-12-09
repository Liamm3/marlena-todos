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
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.eq(2);
        })
        .end(done);
      });
  });

  describe('GET /todos/:id', () => {
    it('should find a todo by id', done => {
      request(app)
        .get(`/api/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res => {
          expect(res.body.text).to.be.eq(todos[0].text);
        })
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
          expect(res.body.text).to.be.eq(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({}).then(todos => {
            expect(todos.length).to.be.eq(3);
            expect(todos[2].text).to.be.eq(text);
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
            expect(todos.length).to.be.eq(2);
            done();
          }).catch(err => done(err));
        })
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todos text and completed status', done => {
      const text = 'New text';
      const hexId = todos[0]._id.toHexString();

      request(app)
        .put(`/api/todos/${hexId}`)
        .send({
          text,
          completed: true
        })
        .expect(200)
        .expect(res => {
          expect(res.body.completed).to.be.eq(true);
          expect(res.body.text).to.be.eq(text);
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }

          Todo.findById(hexId).then(todo => {
            expect(todo.text).to.be.eq(text);
            done();
          }).catch(err => done(err));
        });
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo', done => {
      const hexId = todos[0]._id.toHexString();

      request(app)
        .delete(`/api/todos/${hexId}`)
        .expect(200)
        .expect(res => {
          expect(res.body._id).to.be.eq(hexId);
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }

          Todo.findById(hexId).then(todo => {
            expect(todo).to.not.exist;
            done();
          }).catch(err => done(err));
        });
    });
  });
});
