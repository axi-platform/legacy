/* eslint func-names: 0, no-param-reassign: 0 */
const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  exportPathMap: () => ({
    '/': {page: '/'}
  }),
  webpack: function (config, {dev}) {
    config.profile = true
    config.plugins.push(
      new StatsPlugin('stats.json', {
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
        cached: true,
        reasons: true
      })
    )

    // For the development version, we'll use React.
    // Because, it supports react hot loading and so on.
    if (dev) {
      return config
    }

    config.resolve.alias = {
      // react: 'preact-compat/dist/preact-compat',
      // 'react-dom': 'preact-compat/dist/preact-compat',
      // 'react-emotion': 'preact-emotion'
    }

    return config
  }
}
