var path = require('path');

// Auto generate index.html on build and place it in ./dist/
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Extract in-lined style block into its own file
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.js',
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
        presets: ['es2015', 'react'],
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: 'images/[name].[hash].[ext]',
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css'
    })
  ]
}
