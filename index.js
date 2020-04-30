const inquirer = require("inquirer");
const fs = require("fs");
const api = require("./utils/api.js");
// const util = require("util");

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

// function writeToFile(fileName, data) {
// }

async function init() {
  console.log("\n Welcome to the README Generator \n");
  try {
    const answers = await promptUser();

    // try {
      const userInfo = api.getUser(answers.userName);
    //   console.log("userInfo: " + userInfo);

    //   const readme = `README-${answers.repoName}.md`;
    //   let overwriteOkay = true;

    //   if (fs.existsSync(readme)) {
    //     overwriteOkay = verifyOverwrite(readme);
    //   };

    //   if (overwriteOkay) {
    //   }
    // }
    // catch(error) {
    //   console.log(error);
    // }
  } 
  catch(err) {
    console.log(err);
  }
}

init();

// "name":"Andrea Bentley",
// "company":null,
// "blog":"http://bentleytech.com/",
// "location":"Atlanta, GA",
// "email":null,
// "hireable":true,
// "bio":"Experienced software developer with BS in Computer Science from Georgia Tech. Moving into the world of Web Development.",