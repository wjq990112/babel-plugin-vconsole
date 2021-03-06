const babelCore = require('@babel/core');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const code = ``;

let moduleName;

const visitor = {
  ImportDeclaration(path) {
    if (
      isEnvProduction &&
      path.node.source.value === 'vconsole' &&
      path.node.specifiers[0].type === 'ImportDefaultSpecifier'
    ) {
      moduleName = path.node.specifiers[0].local.name;
      path.remove();
    }
  },
  ExpressionStatement(path) {
    if (
      isEnvProduction &&
      path.node.expression.type === 'NewExpression' &&
      path.node.expression.callee.name === moduleName
    ) {
      path.remove();
    }
  },
  Program(path) {
    if (isEnvDevelopment) {
      const { types } = babelCore;
      const importDeclaration = types.importDeclaration(
        [types.importDefaultSpecifier(types.identifier('VConsole'))],
        types.stringLiteral('vconsole')
      );
      const expressionStatement = types.expressionStatement(
        types.newExpression(types.identifier('VConsole'), [])
      );
      path.node.body.unshift(importDeclaration);
      path.node.body.push(expressionStatement);
    }
  },
};

const newCode = babelCore.transform(code, {
  plugins: [
    [
      {
        visitor: visitor,
      },
    ],
  ],
});

console.log(newCode.code);
