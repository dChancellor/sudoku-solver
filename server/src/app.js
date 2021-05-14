const express = require('express');
const axios = require('axios');
const $ = require('cheerio');

const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const middlewares = require('./middleware');

const getPuzzles = async () => {
  const url = `https://www.nytimes.com/puzzles/sudoku/easy`;
  let { data: html } = await axios.get(url);
  let $parse = $.load(html);
  let windowString = $parse('script').get()[0].children[0].data;
  return JSON.parse(
    windowString.substr(windowString.indexOf('{'), windowString.length)
  );
};

app.get('/', async (_, res) => {
  res.send({ message: '🎂' });
});

app.get('/sudoku', async (_, res) => {
  const data = await getPuzzles();
  res.send(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = { app, getPuzzles };
