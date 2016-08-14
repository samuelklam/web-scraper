var Xray = require('x-ray');
var x = Xray();

x('http://stackoverflow.com/questions', '#questions .question-summary .summary', [{

  title: 'h3',
  link: 'h3 a@href',
  details: x('h3 a@href', {
    title: 'h1',
    question: '.question .post-text',
  })

}])
(function(err, obj) {

  console.log(err);
  console.log(obj);

});
