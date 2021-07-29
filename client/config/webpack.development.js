const commonWebpackConfig = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../build',
    port: 9000,
    hot: true,
    historyApiFallback: {
      index: '/',
    },
  },
});
