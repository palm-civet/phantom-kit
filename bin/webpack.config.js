const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const {traversal} = require('../')
const config = require('config');

const generateHtmlPlugin = (entry) => {
  let path = '';
  if (process.env.NODE_ENV === 'production') {
    path = '../views';
  } else {
    path = config.get('devServe.view');
  }
  return new HtmlWebpackPlugin({
    filename: `${path}/${entry}.html`,
    template: `src/views/${entry}.html`,
    chunks: [entry]
  })
}

const getEntries = () => {
  let entry = {};
  let dirPath = path.resolve(__dirname, '../src');
  let files = fs.readdirSync(dirPath);
  let subfix = '.entry.js';

  files.forEach(file => {
    let filePath = `${dirPath}/${file}`;
    let stat = fs.statSync(filePath);

    if(!stat.isDirectory() && file.includes(subfix)) {
      let filename = file.replace(subfix, '');
      entry[filename] = filePath;
    }
  })
  
  return entry;
}

const webpackConfig = {
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[hash:8].js',
    publicPath: "/static"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          // {loader: 'eslint-loader', options: {fix: true}}
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(svg|eot|ttf|woff)\w*/,
        loader: 'url-loader?limit=1000000&name=${outputFont}'
      }
    ]
  },
  plugins: [
    // new MonacoWebpackPlugin(),
    new ExtractTextPlugin('[name].[hash:8].css')
  ],
  resolve: {
    extensions: ['*', '.js', '.vue']
  }
}

webpackConfig.plugins = Object.keys(webpackConfig.entry)
  .map(entry => generateHtmlPlugin(entry))
  .concat(webpackConfig.plugins)

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))
} else {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }));
  webpackConfig.devServer = {publicPath: "/"};
  webpackConfig.devtool = 'cheap-eval-source-map';
}
    
module.exports = webpackConfig;