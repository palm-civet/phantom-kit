const phantom = require('phantom');

(async function() {
  const instance = await phantom.create(
    [ 
      './lib/yslow.js',
      '--info basic',
      '--format tap',
      'http://baidu.com' 
    ],{
      logger: {
        info: (...msg) => {
          console.log('on info', msg)
          // msgs.push(msg)
        }, 
        error: error => errors.push(error)
      }
    });
  // const page = await instance.createPage();
  // await page.on('onResourceRequested', function(requestData) {
  //   console.info('Requesting', requestData.url);
  // });

  // const status = await page.open('lib/yslow.js');
  // console.log('status',status)
  // const content = await page.property('content');
  // console.log('content', content);

  await instance.exit();
})();