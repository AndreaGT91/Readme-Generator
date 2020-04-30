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

Api.prototype.getUser = async function (username) {
  try {
    axios({
      method: 'get',
      url: `https://api.github.com/users/${username}`,
      headers: {'content-type': 'json', 'Authorization': `token ${process.env.TOKEN}`}
    })
    .then((response) => {
      const {login, html_url, name, avatar_url, company, blog, location, repos_url, email, bio} = response.data;
      const gitInfo = {
        'login': login,
        'html_url': html_url,
        'name': name, 
        'avatar_url': avatar_url, 
        'company': company, 
        'blog': blog, 
        'location': location, 
        'repos_url': repos_url, 
        'email': email, 
        'bio': bio
      }; 
      return gitInfo
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return null
    });
  } catch{(error)=>{
      console.log(error);
      return null
  }}
};

const api = new Api();

module.exports = api;