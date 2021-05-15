const https = require('https');

const getPuzzles = () => {
  let res = https
    .get(process.env.API_URL, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        return data;
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
  return res;
};

module.exports = getPuzzles;
