const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'eslint-loader']
      },
      {
        test: /\.(css)|(scss)$/i,
        use: [
          'style-loader', {
            loader: MiniCssExtractPlugin.loader,
          }, 'css-loader', 'sass-loader'
      ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 1337,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
  }),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css'
  }),
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production'
    config.devtool = 'none'
    config.plugins.push(new CleanWebpackPlugin())
  }
  return config
}