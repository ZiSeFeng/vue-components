const cooking = require('cooking');
const Components = require('./components.json');
const path = require('path');
const config = require('../../build/config');
const webpackShellPlugin = require('webpack-shell-plugin');

const entrys = {};
Object.keys(Components).forEach(key => {
  entrys[key] = [path.join(__dirname, Components[key])];
});

cooking.set({
  entry: entrys,
  dist: path.join(__dirname, 'lib'),
  template: false,
  format: 'umd',
  moduleName: 'muiSpinner',
  extractCSS: '[name]/style.css',
  extends: config.extends,
  alias: config.alias,
  externals: config.externals
});

cooking.add('output.filename', '[name]/index.js');
cooking.add(
  'plugin.WebpackShell',
  new webpackShellPlugin({
    onBuildExit: [
      `mv ${__dirname}/lib/index/* ${__dirname}/lib/ && rm -rf ${__dirname}/lib/index`
    ]
  })
);

module.exports = cooking.resolve();
