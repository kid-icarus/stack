import webpack from 'webpack'
import cssnano from 'cssnano'
import rucksack from 'rucksack-css'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import NpmCheckPlugin from 'npm-check-webpack-plugin'
import config from 'app-config-chain'
import _debug from 'debug'
import path from 'path'
const debug = _debug('app:webpack:default')
debug('Create configuration.')

import moduleLoaders from './loaders'

const globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production'
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: {
    app: [
      path.join(config.paths.client, './index.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'jquery',
      'semantic-ui-css/semantic.js',
      'immutable'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: config.paths.dist,
    publicPath: config.paths.public
  },
  plugins: [
    new NpmCheckPlugin({
      autoInstall: false
    }),
    new webpack.DefinePlugin(globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.client, 'index.html'),
      hash: false,
      favicon: path.join(config.paths.client, 'assets/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js')
  ],
  resolve: {
    modulesDirectories: ['local_modules', 'node_modules'],
    root: config.paths.client,
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: moduleLoaders
  },
  sassLoader: {
    includePaths: path.join(config.paths.client, 'styles')
  },
  postcss: [
    rucksack({
      autoprefixer: true
    }),
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      }
    })
  ],
  eslint: {}
}

export default webpackConfig
