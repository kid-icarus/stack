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
    modulesDirectories: ['local_modules', 'web_modules', 'node_modules'],
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
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'add-module-exports'],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  // omit HMR plugin by default and _only_ load in hot mode
                  transforms: [{
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.sass$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
          'sass?indentedSyntax&sourceMap'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss'
        ]
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
      /* eslint-enable */
    ]
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
