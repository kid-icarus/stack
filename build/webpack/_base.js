import webpack from 'webpack'
import cssnano from 'cssnano'
import rucksack from 'rucksack-css'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from 'app-config-chain'
import _debug from 'debug'

const paths = config.utils_paths
const debug = _debug('app:webpack:_base')
debug('Create configuration.')

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      paths.base(config.dir_client) + '/index.js'
    ],
    vendor: [
      'react',
      'jquery',
      'semantic-ui-css/semantic.js'
    ]
  },
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
      hash: false,
      favicon: paths.client('assets/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor')
  ],
  resolve: {
    modulesDirectories: ['local_modules', 'web_modules', 'node_modules'],
    root: paths.base(config.dir_client),
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
      /* font-awesome loader */
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader' }
    ]
  },
  sassLoader: {
    includePaths: paths.client('styles')
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
