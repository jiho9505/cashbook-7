const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /mode_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // CSS 파일을 빼서 파일로 관리, style-loader 대체
          'css-loader', //  CSS를 CommonJS로 translate
          'sass-loader', //  Sass를 CSS로 Compile
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader', //  파일 관리를 위한 loader, file-loader 대체
            options: {
              name: 'images/[name].[ext]?[hash]',
              limit: 10000, //  작은 파일이나 글꼴은 파일 복사가 아닌 문자열로 변환. bundle 파일이 가벼워짐
            },
          },
        ],
      },
    ],
  },
  /* webpack-dev-server */
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '.dist',
    port: 9000,
    hot: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'), //  어느 파일을 참조할 것인가
      inject: true, //  번들링한 파일을 자동으로 불러올 것인가
      filename: path.resolve(__dirname, './dist/index.html'),
    }),
  ],
};

module.exports = config;
