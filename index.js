'use strict';

// const isEnvDevelopment = process.env.NODE_ENV === 'development';
// const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = ({ types }) => {
  let moduleName = '';

  return {
    name: 'babel-plugin-vconsole',
    visitor: {
      ImportDeclaration(path) {
        if (
          types.isImportDefaultSpecifier(path.node.specifiers[0]) &&
          path.node.source.value === 'vconsole'
        ) {
          moduleName = path.node.specifiers[0].local.name;
          path.remove();
        }
      },
      ExpressionStatement(path) {
        if (
          types.isNewExpression(path.node.expression) &&
          path.node.expression.callee.name === moduleName
        ) {
          path.remove();
        }
      },
      // Program(path) {
      //   let importIndex = -1;
      //   let instanceIndex = -1;

      //   // 是否已经存在 import VConsole from 'vconsole';
      //   const hasImport = path.node.body.some((item, index) => {
      //     const isImport =
      //       types.isImportDeclaration(item) &&
      //       types.isImportDefaultSpecifier(item.specifiers[0]) &&
      //       item.source.value === 'vconsole';

      //     if (isImport) {
      //       importIndex = index;
      //     }

      //     return isImport;
      //   });

      //   // 是否已经存在 new VConsole();
      //   const hasInstance = path.node.body.some((item, index) => {
      //     const isInstance =
      //       types.isExpressionStatement(item) &&
      //       types.isNewExpression(item.expression) &&
      //       item.expression.callee.name === 'VConsole';

      //     if (isInstance) {
      //       instanceIndex = index;
      //     }

      //     return isInstance;
      //   });

      //   // 开发环境
      //   if (isEnvDevelopment) {
      //     const generatorExpressionStatement = () => {
      //       const expressionStatement = types.expressionStatement(
      //         types.newExpression(types.identifier('VConsole'), [])
      //       );
      //       path.node.body.push(expressionStatement);
      //     };

      //     const generatorImportDeclaration = () => {
      //       const importDeclaration = types.importDeclaration(
      //         [types.importDefaultSpecifier(types.identifier('VConsole'))],
      //         types.stringLiteral('vconsole')
      //       );
      //       path.node.body.unshift(importDeclaration);
      //     };

      //     // 已经存在 import 但未存在 new
      //     if (hasImport && !hasInstance) {
      //       generatorExpressionStatement();
      //     }

      //     // 已经存在 new 但未存在 import
      //     if (!hasImport && hasInstance) {
      //       generatorImportDeclaration();
      //     }

      //     // 两者皆未存在
      //     if (!hasImport && !hasInstance) {
      //       generatorImportDeclaration();
      //       generatorExpressionStatement();
      //     }

      //     // 两者皆已经存在
      //     if (hasImport && hasInstance) {
      //       return;
      //     }
      //   }

      //   // 生产环境
      //   if (isEnvProduction) {
      //     path.node.body = path.node.body.filter((_, index) => {
      //       return index !== importIndex && index !== instanceIndex;
      //     });
      //   }

      //   return;
      // },
    },
  };
};
