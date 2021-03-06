const path = require('path')
const webpack = require('webpack')

require('dotenv').load()

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: "development",
        PARSE_APPLICATION_ID: process.env.PARSE_APPLICATION_ID,
        PARSE_JAVASCRIPT_KEY: process.env.PARSE_JAVASCRIPT_KEY,
      }),
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.sass$/,
        loader: 'style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!sass?outputStyle=expanded&imagePath=/assets/images&indentedSyntax=true&includePaths[]=' + path.resolve(__dirname, './assets/stylesheets'), // eslint-disable-line max-len
      },
    ],
  },
}
