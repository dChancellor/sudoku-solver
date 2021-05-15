const https = require('https');

const getPuzzles = () => {
  return https.request(
    {
      hostname: API_URL,
      port: 443,
      path: '/nyt',
      method: 'GET',
    },
    (res) => {
      console.log(res.json);
    }
  );
};

module.exports = getPuzzles;
