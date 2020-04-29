const axios = require("axios");

const api = {
  getUser(username) {
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}`,
      headers: {Authorization: "dbbf5ea03ece6653fa4651a565b549220985a01d"}
    })
    .then(function (response) {
      // handle success
      console.log("Response: " + JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
};

module.exports = api;
