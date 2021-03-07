const fs = require('fs');
const babelCore = require('@babel/core');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

const code = fs.readFileSync('./demo.js', { encoding: 'utf-8' });

const newCode = babelCore.transform(code, {
  plugins: [isEnvProduction && [require('./index')]].filter(Boolean),
});

console.log(newCode.code);
