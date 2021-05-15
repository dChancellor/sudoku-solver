const https = require('https');

const options = {
  hostname: API_URL,
  port: 443,
  path: '/nyt',
  method: 'GET',
};

const getPuzzles = () => {
  return https.request(options, (res) => {
    console.log(res.json);
  });
};

module.exports = getPuzzles;
