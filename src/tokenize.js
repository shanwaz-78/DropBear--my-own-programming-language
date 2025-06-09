const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');
const tokenize = (input) => {
  const tokens = [];
  let currentCursorPosition = 0;
  while (currentCursorPosition < input.length) {
    const currentCharacter = input[currentCursorPosition];
    if (isParenthesis(currentCharacter)) {
      tokens.push({ type: 'Parenthesis', value: currentCharacter });
      currentCursorPosition++;
      continue;
    }
    if (isWhitespace(currentCharacter)) {
      currentCursorPosition++;
      continue;
    }

    if (isNumber(currentCharacter)) {
      let number = currentCharacter;
      while (isNumber(input[++currentCursorPosition])) {
        number += input[currentCursorPosition];
      }
      tokens.push({ type: 'Number', value: parseInt(number, 10) });
      continue;
    }

    if (isLetter(currentCharacter)) {
      let symbol = currentCharacter;
      while (isLetter(input[++currentCursorPosition])) {
        symbol += input[currentCursorPosition];
      }
      tokens.push({ type: 'Name', value: symbol });
      continue;
    }

    if (isQuote(currentCharacter)) {
      let string = '';
      while (!isQuote(input[++currentCursorPosition])) {
        string += input[currentCursorPosition];
      }
      tokens.push({ type: 'String', value: string });
      currentCursorPosition++;
      continue;
    }
    throw new Error(`${currentCharacter} is not a valid token`);
  }
  return tokens;
};

module.exports = { tokenize };
