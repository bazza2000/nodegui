const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const webpack = require('webpack');
const authnUrl = JSON.stringify(process.env.authnUrl);
const authnPort = JSON.stringify(process.env.authnPort);


module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: url => `../fonts/${url}`
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: url => `../img/${url}`
          }
        }]
      }
    ]
  },

  plugins: [
    new SassLintPlugin({
      configFile: '.sass-lint.yml'
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      authnUrl,
      authnPort
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};
