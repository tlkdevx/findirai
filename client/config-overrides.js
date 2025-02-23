const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'http': 'stream-http',
    'https': 'https-browserify',
    'stream': 'stream-browserify',
    'util': 'util',
    'buffer': 'buffer',
    'url': 'url',
    'assert': 'assert',
    'os': 'os-browserify/browser',
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  )
);