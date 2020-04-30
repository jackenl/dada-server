const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;
const request = supertest(app.listen(3000));

const user = {
  username: '13160883942',
  password: '123456',
};

let token = '';

// 测试
describe('测试请求接口', () => {
  it('测试登陆请求', (done) => {
    request
      .post('/users/login')
      .send(user)
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        token = res.body.data.token;
        done();
      });
  });

  it('测试获取用户信息请求', (done) => {
    request
      .get('/users/getUserInfo')
      .set('Cookie', [`token=${token}`])
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('测试附近推荐', (done) => {
    request
      .get('/nearby/recommend')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.poi_list).to.be.an('array');
        done();
      })
  })
});
