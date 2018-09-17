const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
const {apis} = require('./apis');

router.use('/api', apis.routes(), apis.allowedMethods());

router.get('/', async ctx => {
  await ctx.render('index');
});

// router.get('/run', async ctx => {
//   await ctx.render('run');
// })

// router.get('/responsible', async ctx => {
//   await ctx.render('responsible');
// })

module.exports.router = router;