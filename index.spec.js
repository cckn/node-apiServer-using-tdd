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
        it('id가 숫자가 아닐 경우 400으로 응답한다. ', done => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다. ', done => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/:id', () => {
    describe('성공 시 ', () => {
        it('204를 응답한다. ', done => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('실패 시', () => {
        it('id가 숫자가 아닐 경우 400으로 응답한다.', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users', () => {
    let name = 'daniel',
        body;

    describe('성공 시 ', () => {
        // let name = 'daniel',
        //     body;
        before(done => {
            request(app)
                .post('/users')
                .send({ name: name })
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });

        console.log(`name :: ${body}`);

        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다.', () => {
            body.should.have.property('name', name);
        });
    });

    describe('실패 시 ', () => {
        it('name parameter 누락시 400을 반환한다.', done => {
            request(app)
                .post('/users/')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.', done => {
            request(app)
                .post('/users/')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done);
        });
    });
});

describe('PUT /users/:id', () => {
    const name = 'chally';

    describe('성공 시 ', () => {
        it('변경된 name을 응답한다', done => {
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('실패 시', () => {
        it('정수가 아닌 id일 경우 400 응답', done => {
            request(app)
                .put('/users/one')
                .send({ name })
                .expect(400)
                .end(done);
        });
        it('name이 없을 경우 400 응답', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 유저일 경우 404 응답', done => {
            request(app)
                .put('/users/999')
                .send({ name })
                .expect(404)
                .end(done);
        });
        {
            before(done => {
                request(app)
                    .put('/users/3')
                    .send({ name: 'test' })
                    .end(done);
            });

            it('이름이 중복일 경우 409 응답', done => {
                request(app)
                    .put('/users/2')
                    .send({ name: 'test' })
                    .expect(409)
                    .end(done);
            });
        }
    });
});
