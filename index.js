const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "userName",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "repoName",
    message: "What is your repository name?"
  },
  {
    type: "input",
    name: "projTitle",
    message: "What is your project title?",
  },
  {
    type: "input",
    name: "projDesc",
    message: "What is your project description?"
  },
  {
    type: "input",
    name: "projInstall",
    message: "What are your project's installation instructions?",
  },
  {
    type: "input",
    name: "projMods",
    message: "Enter your dependencies, separated by commas:",
  },
  {
    type: "input",
    name: "projUsage",
    message: "How do you use your project?"
  },
  {
    type: "input",
    name: "projLicense",
    message: "What type of license does your project have?",
  },
  {
    type: "input",
    name: "projContrib",
    message: "How would some contribute to your project?"
  },
  {
    type: "input",
    name: "projTests",
    message: "What are your project's tests?"
  }
];

async function verifyOverwrite(fileName) {
  return inquirer.prompt([{
    type: "confirm",
    name: "confirmOverwrite",
    message: fileName + " exists. Overwrite?"
  }]);
}

async function writeToFile(filename, answers) {
  let writeOkay = true;

  if (fs.existsSync(filename)) {
    writeOkay = await verifyOverwrite(filename);
  };

  if (writeOkay) {
    if (writeFileAsync(filename, markdown.generateMarkdown(answers, api), (error) => {
      console.log('Unable to create readme file at this time. \n', error);
    })) {
      console.log('Created ', filename);
    }
  }
};

async function init() {
  console.log("\n *** Welcome to the README Generator *** \n");
  try {
    const answers = await inquirer.prompt(questions);
    await api.getUserInfo(answers.userName.trim())
    .finally(() => {
      const readme = `./readme/README-${answers.repoName.trim()}.md`;
      writeToFile(readme, answers);
    });
  }
  catch (error) {
    console.log(error);
  }
};

init();