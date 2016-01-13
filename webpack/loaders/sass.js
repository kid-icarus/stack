export default [
  {
    test: /\.sass$/,
    loaders: [
      'style',
      'css?sourceMap',
      'postcss',
      'sass?indentedSyntax&sourceMap'
    ]
  },
]
