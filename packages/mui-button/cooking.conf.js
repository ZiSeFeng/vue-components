const cooking = require('cooking');
const path = require('path');
const config = require('../../vue.config.js');

cooking.set({
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  dist: path.join(__dirname, 'lib'),
  template: false,
  format: 'umd',
  moduleName: 'MUiButton',
  extractCSS: 'style.css',
  alias: config.alias,
  externals: config.externals
});

module.exports = cooking.resolve();
