const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/index.jsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [/node_modules/, /\.(test|spec).(js|jsx)?$/],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.mp4$/,
        exclude: [/node_modules/],
        loader: 'file-loader',
      },
    ],
  },

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}),
  ],

};
