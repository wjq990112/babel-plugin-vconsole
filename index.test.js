const babelCore = require('@babel/core');

const getCode = (code) => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';

  const { transform } = babelCore;
  const newCode = transform(code, {
    plugins: [isEnvProduction && [require('./index')]].filter(Boolean),
  });

  return newCode.code;
};

describe('babel-plugin-vconsole', () => {
  it('should it remove vconsole correctly when production.', () => {
    const code = `import VConsole from 'vconsole';

new VConsole();
`;

    process.env.NODE_ENV = 'production';

    expect(getCode(code)).toEqual('');
  });
});
