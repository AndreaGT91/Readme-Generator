const axios = require("axios").default;

const api = {
  getUser(username) {
    axios.get("https://api.github.com/users/" + username)
    .then(function (response) {
      // handle success
      console.log("Response: " + response.data);
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
};

module.exports = api;
