const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestions = () => {
  const questions = {
    name: 'COMMAND',
    type: 'input',
    message: chalk.blue('> '),
  };
  return prompt(questions);
};

const repl = async () => {
  try {
    const { COMMAND } = await askQuestions();
    if (COMMAND.trim() === 'exit' || COMMAND.trim() === 'quit') {
      console.log(chalk.green('Exiting the REPL. Goodbye!'));
      return;
    }
    if (COMMAND.trim()) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
  } catch (error) {
    console.error(`[Error]: ${error}`);
  }
  repl();
};

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
