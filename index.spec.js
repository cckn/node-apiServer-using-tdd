const app = require('./index');

const request = require('supertest');
const should = require('should');

describe('GET /users는', () => {
  describe('\n성공시', () => {
    it('유저 객체를 담은 배열로 응답한다. ', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 Limit 갯수만큼 응답한다. ', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });

    it(' offset 작동 ', done => {
      request(app)
        .get('/users?offset=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(1);
          done();
        });
    });
  });

  describe('\n실패시', () => {
    it('limit이 숫자형이 아니면 400을 리턴한다.', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });

    it('offset이 숫자형이 아니면 400을 리턴한다.', done => {
      request(app)
        .get('/users?offset=one')
        .expect(400)
        .end(done);
    });
  });
});

describe('GET /users/id 는', () => {
  describe('\n성공시', () => {
    it('id가 일치하는 유저 객체를 반환한다. ', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('\n실패시', () => {
    it('id가 숫자가 아닐 경우 400 ', done => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done);
    });
    it('id가 없을 경우 404', done => {
      request(app)
        .get('/users/10')
        .expect(404)
        .end(done);
    });
  });
});
