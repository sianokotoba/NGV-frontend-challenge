var webpack = require('webpack');

var options = {
  name: "vendor",
  filename: "vendor.bundle.js",
  chunks: "vendor"
}

var commonChunk = new webpack.optimize.CommonsChunkPlugin(options);

// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var extractSass = new ExtractTextPlugin({
//     filename: "index.css",
//     disable: process.env.NODE_ENV === "development"
// });


module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './app.js',
    vendor: ['angular']
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  output: {
    path: __dirname + '/js',
    filename: 'app.bundle.js'
  },
  plugins: [
    commonChunk
  ]
};
