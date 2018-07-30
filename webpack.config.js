const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const devServer = {
  contentBase: path.resolve('dist'),
  hot: true,
  host: process.env.host || 'localhost',
  port: process.env.PORT || 5000
};

const webpackConfig = (env) => {
  let processEnv = {};
  if (env && env.dev) {
    processEnv = require('./configs/dev');
  } else if (env && env.production) {
    processEnv = require('./configs/prod');
  }

  const config = {
    entry: {
      app: path.resolve('./src/bootstrap.js')
    },
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: path.resolve('./src/index.html')
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./src/index.html')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new CleanWebpackPlugin(['dist'])
    ]
  };

  if (env && env.dev) {
    config.devServer = devServer;
    config.plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': processEnv
      })
    );
  }

  if (env && env.production) {
    config.devtool = 'source-map';
    config.plugins.push(
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: true
        },
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env': processEnv
      })
    );
  }

  return config;
};

module.exports = webpackConfig;
