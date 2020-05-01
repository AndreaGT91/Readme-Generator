function Markdown() {};

Markdown.prototype.generateMarkdown  = function(answers, data) {
  return `
# ${answers.projTitle}

`;
};

const markdown = new Markdown();

module.exports = markdown;
