const phantom = require('phantom');
const {getReadyTime} = require('./lib/phantom');

(async function() {
  console.log('start')
  let [errs, msgs] = await getReadyTime('http://baidu.com');
  // console.log(msgs);
  console.log('messages:', errs, msgs);
  // console.log('done')
  // let pathtompage = new PhantomPage('http://baidu.com');
  // await pathtompage.init();
  // await pathtompage.getReadyTime((key) => {
  //   console.log(key)
  // });
  
  // await pathtompage.exit();
  // const instance = await phantom.create(
  //   [ 
  //     './lib/yslow.js',
  //     '--info basic',
  //     '--format tap',
  //     'http://baidu.com' 
  //   ],{
  //     logger: {
  //       info: (...msg) => {
  //         console.log('on info', msg)
  //         // msgs.push(msg)
  //       }, 
  //       error: error => errors.push(error)
  //     }
  //   });
  // // const page = await instance.createPage();
  // // await page.on('onResourceRequested', function(requestData) {
  // //   console.info('Requesting', requestData.url);
  // // });

  // // const status = await page.open('lib/yslow.js');
  // // console.log('status',status)
  // // const content = await page.property('content');
  // // console.log('content', content);

  // await instance.exit();
})();