'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
app.use(bodyParser.json());

// request('https://news.ycombinator.com/newest', (err, res, html) => {
//   let $ = cheerio.load(html);
//   console.log($('title').text());
//   // => News Link | Hacker News
// });

request('https://news.ycombinator.com/newest', (err, res, html) => {
  const $ = cheerio.load(html);

  for (let i = 1; i <= 88; i+=3) {
    // grabs the needed table Row
    var tableRow = `table tr:nth-child(3) table tr:nth-child(${i})`;

    // grab article rank
    let rank = $(`${tableRow} span`).html();

    // grab urlLink and title which are in same <td>
    let extractHref = $(`${tableRow} td:nth-child(3) a`);
    let urlLink = extractHref.attr().href;
    let title = extractHref.html();

    console.log(rank);
    console.log(urlLink);
    console.log(title);
  }
});

const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(chalk.blue('Server started on port', chalk.magenta(PORT))));

