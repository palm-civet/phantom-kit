const apis = require('koa-router')();
const {runUrl} = require('../service/run');

apis.post('/run-url', async (ctx) => {
  let {url} = ctx.request.body;
  let [errors, msgs] = await runUrl(url);
  if (errors) {
    ctx.error(errors[0].message);
  } else {
    ctx.success(msgs);
  }
})

module.exports.apis = apis;