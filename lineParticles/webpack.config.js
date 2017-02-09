var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: './dist'
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
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}