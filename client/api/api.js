const getPuzzles = () => {
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

module.exports = getPuzzles;
