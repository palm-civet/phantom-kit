const phantom = require('phantom');
const config = require('config');
const path = require('path');

// 模拟命令行执行phantom js
function phantomRun (commands) {
  return new Promise((resolve, reject) => {
    let msgs = [];
    let errors = null;
    
    phantom.create(commands, {
      logger: {
        info: (...msg) => msgs.push(...msg), 
        error: error => errors = error,
        debug: msg => {
          // 判断退出
          let reg = new RegExp('Child exited with code {(\\d)}');
          if(reg.test(msg)) {
            let code = RegExp.$1;
            // 是否是错误退出
            if (code > 0) {
              reject(errors);  
            } else {
              resolve(msgs);
            }
          }
        }
      }
    })
  })
}

module.exports.phantomRun = phantomRun;

// 获取页面的yslow报告
module.exports.getYslow = async (url, options = {}) => {
  let ysPath = [path.resolve(__dirname, 'yslow.js')]//['./lib/yslow.js'];
  let defaultOptions = config.get('yslow.options');

  let mergedOptions = {...defaultOptions, ...options};

  // 合并yslow参数
  let commands = ysPath.concat(
    Object.keys(mergedOptions).map(
      key => `--${key} ${mergedOptions[key]}`
    )
  ).concat(url)

  try {
    let msgs = await phantomRun(commands);
    return [null, msgs];
  } catch (errs) {
    // TODO: 记录到日志中
    console.log(errs);
    return [errs];
  }
}

// 获取页面的ready时间
module.exports.getReadyTime = async (url, options = {}) => {
  let readyPath = [path.resolve(__dirname, 'get-ready-time.js')];
  try {
    let msgs = await phantomRun([readyPath, url]);
    return [null, msgs];
  } catch (errs) {
    // TODO: 记录到日志中
    console.log(errs);
    return [errs];
  } 
}