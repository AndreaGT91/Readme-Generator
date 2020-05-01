const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");

const getUserData = util.promisify(api.getUser);

// const writeFileAsync = util.promisify(fs.writeFile);

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
  // },
  // {
  //   type: "input",
  //   name: "projTitle",
  //   message: "What is your project title?"
  // },
  // {
  //   type: "input",
  //   name: "projDesc",
  //   message: "What is your project description?"
  // },
  // {
  //   type: "input",
  //   name: "projUser",
  //   message: "What type of person is your audience? (i.e. developer, accountant, teacher)"
  // },
  // {
  //   type: "input",
  //   name: "projNeed",
  //   message: "What is your audience's need?"
  // },
  // {
  //   type: "input",
  //   name: "projResult",
  //   message: "What is the target outcome for your audience?"
  // },
  // {
  //   type: "input",
  //   name: "projInstall",
  //   message: "What are your project's installation instructions?"
  // },
  // {
  //   type: "input",
  //   name: "projLicense",
  //   message: "What type of license does your project have?"
  // },
  // {
  //   type: "input",
  //   name: "projContribs",
  //   message: "Enter the GitHub usernames of all contributors, separated by commas:"
  // },
  // {
  //   type: "input",
  //   name: "projTests",
  //   message: "Project tests?"
  // },
  // {
  //   type: "input",
  //   name: "projQs",
  //   message: "Project questions?"
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

function writeToFile(answers) {
  const readme = `./readme/README-${answers.repoName}.md`;
  let writeOkay = true;

  if (fs.existsSync(readme)) {
    writeOkay = verifyOverwrite(readme);
  };

  if (writeOkay) {
    // fs.writeFile(readme, markdown.generateMarkdown(answers, api));
  }
};

async function getUserInfo(userName) {
  let success = false;
  try {
    console.log('in getUserInfo');
    success = await getUserData(userName);
    console.log('Success: ', success);
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
    if (getUserInfo(answers.userName)) {
      console.log('User name: ', api.name);
      writeToFile(answers);
    }
    else {
      console.log('Did not get user info');
    }
  }
  catch(error) {
    console.log(error);
  } 
};

init();