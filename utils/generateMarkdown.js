function Markdown() {};

Markdown.prototype.generateMarkdown  = function(answers, data) {
  // Purpose of this object is to check for blank answers, and format accordingly
  let obj = {
    installation: getInstallation(answers.projInstall),
    dependencies: getDependencies(answers.projMods),
    usage: getUsage(answers.projUsage),
    license: getLicense(answers.projLicense),
    contributing: getContrib(answers.projContrib),
    tests: getTests(answers.projTests),
    questions: getQuestions(data),
    getTableOfContents: function () {
      // if all the answers are blank, no need for table of contents
      if ((this.installation === '') && (this.dependencies === '') && (this.usage === '') && 
        (this.license === '') && (this.contributing === '') && (this.tests === '') && 
        (this.questions === '')) {
        return ''
      }
      else {
        let toc = '## Table of Contents \n';
        if (this.installation !== '') {toc += '* [Installation](#installation) \n'};
        if (this.dependencies !== '') {toc += '* [Badges](#badges) \n'};
        if (this.usage !== '') {toc += '* [Usage](#usage) \n'};
        if (this.license !== '') {toc += '* [License](#license) \n'};
        if (this.contributing !== '') {toc += '* [Contributing](#contributing) \n'};
        if (this.tests !== '') {toc += '* [Tests](#tests) \n'};
        if (this.questions !== '') {toc += '* [Questions](#questions) \n'};
        toc += '\n';
        return toc
      }
    }
  };

  return `# ${answers.projTitle.trim()} \n
${answers.projDesc.trim()} \n\n
${obj.getTableOfContents()}
${obj.installation}
${obj.dependencies}
${obj.usage}
${obj.license}
${obj.contributing}
${obj.tests}
${obj.questions}`;
};

function getInstallation(install) {
  install = install.trim();
  if (install === '') {return ''}
  else {return `## Installation \n \`${install}\` \n\n`}
}

function getDependencies(dependencies) {
  dependencies = dependencies.trim();
  if (dependencies.length === 0) {
    return ''
  }
  else {
    const list = dependencies.split(',');
    let depList = '## Badges \n';
    list.forEach(function (item) {
      depList += `[![npm version](https://badge.fury.io/js/${item.trim()}.svg)](https://badge.fury.io/js/${item.trim()}) \n`;
    });
    return depList + '\n'
  }
}

function getUsage(usage) {
  usage = usage.trim();
  if (usage === '') {return ''}
  else {return `## Usage \n \`${usage}\` \n\n`}
}

function getLicense(license) {
  license = license.trim();
  if (license === '') {return ''}
  else {return `## License \n ${license} \n\n`}
}

function getContrib(contrib) {
  contrib = contrib.trim();
  if (contrib === '') {return ''}
  else {return `## Contributing \n ${contrib} \n\n`}
}

function getTests(tests) {
  tests = tests.trim();
  if (tests === '') {return ''}
  else {return `## Tests \n ${tests} \n\n`}
}
  
function getQuestions(data) {
  const name = data.name.trim();
  const urlPic = data.avatar_url.trim();
  const login = data.login.trim();
  const email = data.email.trim();

  if ((name === '') && (urlPic === '') && (login === '') && (email === '')) {
    return ''
  }
  else {
    let questions = '## Questions \n ';
    if (urlPic !== '') {
      if (name === '') {questions += '![Picture]'}
      else {questions += `![${name}]`};
      questions += `(${urlPic}&s=48)  `;
    }
    if (name !== '') {questions += `${name}  `};
    if (login !== '') {questions += `(${login})  `};
    if (email !== '') {questions += `[${email}](mailto:${email})`};
    return questions
  }
}

const markdown = new Markdown();

module.exports = markdown;