// $ phantomjs phantom.js
const page = require('webpage').create();

// grab screenshot of google
// page.open('https://google.com', function() {
//     page.render('google.png');
//     phantom.exit();
// });

page.settings.userAgent = 'SpecialAgent';
page.open('http://www.httpuseragent.org', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var ua = page.evaluate(function() {
      return document.getElementById('myagent').textContent;
    });
    console.log(ua);
    // => Your Http User Agent string is: SpecialAgent
  }
  phantom.exit();
});

// open web page, include jQuery library into the page, click on all buttons using jQuery
// page.open('http://www.google.com', function() {
//   page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//     page.evaluate(function() {
//       $("button").click();
//     });
//     phantom.exit();
//   });
// });

