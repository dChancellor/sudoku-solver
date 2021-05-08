const express = require('express');
const axios = require('axios');
const $ = require('cheerio');

const app = express();

const getPuzzles = async () => {
    const url = `https://www.nytimes.com/puzzles/sudoku/easy`;
    let { data: html } = await axios.get(url);
    let $parse = $.load(html);
    let windowString = $parse('script').get()[0].children[0].data;
    return JSON.parse(
      windowString.substr(windowString.indexOf('{'), windowString.length)
    );
  };

app.get('/', async (req, res) => {
    const data = await getPuzzles();
    res.send(data);
})

app.listen(3000, () => console.log('Server running on port 3000!'))


