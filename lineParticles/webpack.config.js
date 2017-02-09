var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var FriendlyErrors = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new FriendlyErrors(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}