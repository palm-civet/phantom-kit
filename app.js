const Koa = require('koa');
// const session = require('koa-session');
// const log4js = require('koa-log4')
const bodyParser = require('koa-bodyparser');
const customResponse = require('./middleware/response');
// const {generateId} = require('./middleware/session-id');
const { router } = require('./route');
// const connection = require('./db/connection');
// const path = require('path');
const config = require('config');
const proxy = require('koa-proxy');
const serve = require('koa-static');

// log4js.configure(require('./log/log4js.json'));

// const logger = log4js.getLogger('app');

const app = new Koa();

if (process.env.NODE_ENV === 'production') {
  app.use(serve(path.join(__dirname, '../public')));
} else {
  app.use(proxy({
    host: config.get('devServe.host'),
    match: /^\/static\//,
    map: path => path.replace('/static', '')
  }))
}

app.use(bodyParser());
app.use(customResponse(process.env.NODE_ENV === 'production'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.get('app.port'));