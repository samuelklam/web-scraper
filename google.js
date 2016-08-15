var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('http://google.com', function() {
    // search for 'javascript' from google form
    this.fill('form[action="/search"]', { q: 'javascript' }, true);
});

casper.then(function() {
    // aggregate results for the 'javascript' search
    links = this.evaluate(getLinks);
    // now search for 'python' by filling the form again
    this.fill('form[action="/search"]', { q: 'python' }, true);
});

casper.then(function() {
    // aggregate results for the 'python' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
