'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
app.use(bodyParser.json());

const hackerNewsData = {};

/**
 * Note:
 * the below may not be a robust solution as HN's site and the article
 * format may change from time to time. Adapt as needed.
 */
request('https://news.ycombinator.com/newest', (err, res, html) => {
  const $ = cheerio.load(html);
  // alternatively can select by class (was not used)
  // let rows = $('.athing').each(() => console.log($(this).text()));

  for (let i = 1; i <= 88; i+=3) {
    // grabs the needed table Row
    let tableRow = `table tr:nth-child(3) table tr:nth-child(${i})`;

    // grab article rank
    let rank = $(`${tableRow} span`).html().slice(0, -1);
    hackerNewsData[rank] = {};

    // grab urlLink, title and site which are in same <td>
    let extractTd = `${tableRow} td:nth-child(3)`;

    // grab urlLink
    let urlLink = $(`${extractTd} a`).attr().href;

    // steps to grab and format title and site
    let header = $(`${extractTd}`).first().text();
    let lastIdx = header.lastIndexOf(' ');
    let title = header.substring(0, lastIdx);
    let site = header.slice(lastIdx+2, -1);

    hackerNewsData[rank]['url'] = urlLink;
    hackerNewsData[rank]['title'] = title;
    hackerNewsData[rank]['site'] = site;
  }
  fs.writeFile('hackerNews.json', JSON.stringify(hackerNewsData, null, 4), err => {
    const msg = err || 'Created successfully!';
    console.log(msg);
  });
});

const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(chalk.blue('Server started on port', chalk.magenta(PORT))));

