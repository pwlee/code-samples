var path = require('path');

// Auto generate index.html on build and place it in ./dist/
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'src')],
      test: /\.jsx?$/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015'],
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    hash: true,
    template: './src/index.html'
  })]
};
