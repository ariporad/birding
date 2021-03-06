var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + (process.env.PORT || 3000),
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      '__ENV__': JSON.stringify({
        BIRD_ODDS: 50,
        LOOK_TIME: 1000,
      }),
      '__DEV__': process.env.NODE_ENV !== 'production',
      'process.env': JSON.stringify(process.env), // In case someone else uses it
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '', '.jpg', '.png'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};
