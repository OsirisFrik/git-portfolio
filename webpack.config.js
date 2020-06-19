require('dotenv').config();
const path = require('path');
const DotEnv = require('dotenv-webpack');
const HTMLWp = require('html-webpack-plugin');

(async () => user = await getUser());

const env = new DotEnv();
const html = new HTMLWp({
  filename: 'index.html',
  template: './src/index.html',
  inject: true,
  title: `${process.env.USER} | GitFolio`,
  inject: true
});

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },
  devServer: {
    port: 3000,
    open: false
  },
  plugins: [
    env,
    html
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
