const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = ({ types }) => {
  let moduleName;

  return {
    name: 'babel-plugin-vconsole',
    visitor: {
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
    },
  };
};
