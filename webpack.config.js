const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve('./bin'),
  devtool: 'eval-source-map',
  entry: {
    // index: [
    //   'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
    //   'babel-polyfill',
    //   './www'
    // ],
    index: './www'
  },
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/build/',
    // webpack-dev-server伺服的文件是相对publicPath这个路径的
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    // 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: ["eslint-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8192'
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};