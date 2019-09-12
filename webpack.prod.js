const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: './src/index.jsx'
  },
  mode: 'production',
   plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
     cacheGroups: {
      vendor: {
       test: /node_modules/,
       chunks: 'initial',
       name: 'vendor',
       enforce: true
      },
     }
    } 
   }
});