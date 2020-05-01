function Markdown() {};

Markdown.prototype.generateMarkdown  = function(answers, data) {
  const dependencies = getDependencies(answers.projMods);

  return `
# ${answers.projTitle} \n\n
${answers.projDesc} \n\n
## Table of Contents \n\n
* [Installation](#installation)
* [Badges](#badges)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions) \n\n
## Installation \n\n
\`${answers.projInstall}\` \n\n
## Badges \n\n
${dependencies} \n\n
## Usage \n\n
\`${answers.projUsage}\` \n\n
## License \n\n
${answers.projLicense} \n\n
## Contributing \n\n
${answers.projContrib} \n\n
## Tests \n\n
${answers.projTests} \n\n
## Questions \n\n
![${data.name}](${data.avatar_url}&s=38) ${data.name} (${data.login}) [${data.email}](mailto:${data.email}) \n
`;
};

function getDependencies(dependencies) {
  const list = dependencies.split(', ');
  let depList = '';
  list.forEach(function (item) {
    depList += `[![Node version](https://img.shields.io/node/v/${item}.svg?style=flat)](http://nodejs.org/download/) \n`;
  })
  return depList
}

const markdown = new Markdown();

module.exports = markdown;