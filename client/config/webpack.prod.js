const commonWebpackConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
});
