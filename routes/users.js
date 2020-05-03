const Router = require('koa-router');

// controllers
const users = require('../controllers/users');

const router = new Router({
  prefix: '/users',
});

router.post('/register', users.signUp);
router.post('/login', users.signIn);
router.post('/updatePassword', users.updatePassword);
router.get('/userInfo', users.getUserInfo);
router.post('/updateUserInfo', users.updateUserInfo);

module.exports = router;
