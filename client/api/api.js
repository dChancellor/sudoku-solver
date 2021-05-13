const getPuzzles = () => {
  document.querySelector('.loading').style.display = 'block';
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.loading').style.display = 'none';
      return data;
    });
};

module.exports = getPuzzles;
