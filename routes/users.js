const Router = require('koa-router');

// controllers
const users = require('../controllers/users');

const router = new Router({
  prefix: '/users',
});

router.post('/register', users.signUp);
router.post('/login', users.signIn);
router.post('/userInfo', users.getUserInfo);

module.exports = router;
