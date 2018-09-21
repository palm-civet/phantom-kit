var webpage = require("webpage")
var system = require('system')
var args = system.args;
var urls = [];

var len = args.length;
for (i = 0; i < len; i += 1) {
  var arg = args[i];
  if (arg[0] !== "-") {
    if (arg.indexOf("http") === 0) {
      urls.push(arg)
    }
  }
}

urls.forEach(function(url){
  var page = webpage.create();
  var startload
  page.onLoadStarted = function() {
    startload = new Date().getTime();
  }
  page.onInitialized = function() {
    page.injectJs('./get_data.js')
  }

  page.open(url, function (status) {
    var k_report = page.evaluate(function(){
        return window.k_report;
    })
    console.log(JSON.stringify({url:url, dom_complete: k_report.dom_complete - startload, window_onload: k_report.window_onload - startload}))
    phantom.exit(0)
  })
})

