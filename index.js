const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");

const getUserData = util.promisify(api.getUser);
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

function promptUser() {
  return inquirer.prompt(questions);
}

function verifyOverwrite(fileName) {
  return inquirer.prompt([{
    type: "confirm",
    name: "confirmOverwrite",
    message: fileName + " exists. Overwrite?"
  }]);
}

function writeToFile(filename, answers) {
  let success = false;
  let writeOkay = true;

  if (fs.existsSync(filename)) {
    writeOkay = verifyOverwrite(filename);
  };

  if (writeOkay) {
    writeFileAsync(filename, markdown.generateMarkdown(answers, api), (error) => {
      if (error) throw error;
      success = true;
    });
  }

  return success
};

async function getUserInfo(userName) {
  let success = false;
  try {
    success = await getUserData(userName);
    return success
  }
  catch(error) {
    console.log(error);
    return success
  }
};

async function init() {
  console.log("\n *** Welcome to the README Generator *** \n");
  try {
    const answers = await promptUser();
    if ((answers.userName.trim() !== '') && (!getUserInfo(answers.userName))) {
      console.log('Unable to retrieve GitHub information.');
    }
    const readme = `./readme/README-${answers.repoName}.md`;
    const success = writeToFile(readme, answers);
    if (success) {
      console.log('Created ', readme);
    }
    else {
      console.log('Unable to create readme file at this time.');
    }
  }
  catch(error) {
    console.log(error);
  } 
};

init();