const Router = require('koa-router');

const router = new Router({
  prefix: '/users'
})

router.get('/', ctx => {
  ctx.body = 'this is a users response!';
});

router.get('/bar', ctx => {
  ctx.body = 'this is a users/bar response!';
});

module.exports = router;
