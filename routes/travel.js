const Router = require('koa-router');

// controllers
const travel = require('../controllers/travel');

const router = new Router({
  prefix: '/travel',
});

router.post('/insertRecord', travel.insertTravelRecord);
router.get('/getRecordsByPage', travel.getTravelRecordsByPage);
router.get('/getRecordById', travel.getTravelReCordById);
router.get('/travelData', travel.getTravelData);
router.post('/insertCity', travel.insertTravelCity);

module.exports = router;
