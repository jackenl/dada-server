const Router = require('koa-router');

// controllers
const sport = require('../controllers/sport');

const router = new Router({
  prefix: '/sport',
});

router.post('/insertRecord', sport.insertSportRecord);
router.get('/getRecordsByPage', sport.getSportRecordsByPage);
router.get('/getRecordById', sport.getSportRecordById);
router.get('/getTravelData', sport.getSportData);

module.exports = router;
