const { environment } = require('./standard-library');

const apply = (node) => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);
  if (typeof fn !== 'function') {
    throw new TypeError(`Expected a function, but got ${typeof fn}`);
  }
  return fn(...args);
};

const evaluate = (node) => {
  switch (node.type) {
    case 'CallExpression':
      return apply(node);

    case 'NumericLiteral':
    case 'StringValue':
      return node.value;

    case 'Identifier': {
      const value = environment[node.name];
      if (value === undefined) {
        throw new ReferenceError(`Undefined identifier: ${node.name}`);
      }
      return value;
    }

    default:
      throw new TypeError(`Unknown node type: ${node.type}`);
  }
};

module.exports = { evaluate };
