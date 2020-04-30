const axios = require('axios');
require('dotenv').config();

const api = {
  getUser(username) {
    axios({
      method: 'get',
      url: `https://api.github.com/users/${username}`,
    })
    .then(function (response) {
      // handle success
      console.log('Response: ' + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
};

module.exports = api;
