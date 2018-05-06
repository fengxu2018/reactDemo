const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packagejson = require('./package.json');

const cssModuleSettings = {
  cssLoader: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64]',
  }
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: './src/index.jsx',
    vendor: [
      'bootstrap',
      'jquery',
      'popper.js',
      'react',
      'react-dom',
      'underscore'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/, // Check for all js files
      exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: `css-loader?${JSON.stringify(cssModuleSettings.cssLoader)}`, // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }),
    }, {
      test: /\.(otf|ttf)$/,
      loader: 'file-loader?emitFile=false&name=../[path][name].[ext]',
      include: [path.resolve('./fonts')]
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }, {
      test: /\.(scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }),
    },]
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.html'],
  },
  devServer: {
    // hot: true,
    historyApiFallback: true,
    port: 8080,
    stats: {
      colors: true
    },
  },
  plugins: [
    // new CaseSensitivePathsPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      _: 'underscore',
      classNames: 'classnames',
      React: 'react',
      ReactDOM: 'react-dom',
      ReactRedux: 'react-redux',
      Redux: 'redux',
      update: 'immutability-helper',
      PropTypes: 'prop-types',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      filename: '[name].js'
    }),
    new ExtractTextPlugin('main.css'),
  ],
  node: {
    __filename: true,
  },
}
