const Koa = require('koa');
const app = new Koa();

// middleware import
const logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror');
const sendHandle = require('./middleware/sendHandle');
const cors = require('./middleware/cors');

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// global middlewares
app.use(
  views('views', {
    root: __dirname + '/views',
    default: 'jade',
  })
);
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(sendHandle());
app.use(cors());

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
