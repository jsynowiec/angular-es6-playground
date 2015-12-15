var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  entry: './src/app.js',
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', '!css!sass')
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(woff|ttf)$/,
        loader: 'url?prefix=font/&limit=100000'
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ]
};
