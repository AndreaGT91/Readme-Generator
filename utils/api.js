const axios = require('axios');
require('dotenv').config();

const Api = function() {
  this.login = '';
  this.html_url = '';
  this.name = '';
  this.avatar_url = '';
  this.company = '';
  this.blog = '';
  this.location = '';
  this.repos_url = '';
  this.email = '';
  this.bio = '';
};

Api.prototype.getUserInfo = async function (username) {
  if (username === '') {
    return null
  };
  const getUserResult = await axios({
    method: 'get',
    url: `https://api.github.com/users/${username}`,
    headers: {'content-type': 'json', 'Authorization': `token ${process.env.TOKEN}`}
  })
  .then((response) => {
    const {login, html_url, name, avatar_url, company, blog, location, repos_url, email, bio} = response.data;
    this.login = login;
    this.html_url = html_url;
    this.name = name;
    this.avatar_url = avatar_url;
    this.company = company;
    this.blog = blog;
    this.location = location;
    this.repos_url = repos_url;
    this.email = email;
    this.bio = bio;
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });
  return getUserResult
};

const api = new Api();

module.exports = api;