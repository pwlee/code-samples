var path = require('path');

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
        plugins: ['transform-runtime', 'transform-class-properties'],
        presets: ['es2015'],
      }
    }]
  }
};
