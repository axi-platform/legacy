const webpack = require("webpack")
const path = require("path")

const DEBUG = true

module.exports = {
  entry: {
    app: "./app/index.js",
    debug: "./debug/index.js"
  },

  output: {
    filename: "[name]/build/build.js",
    path: __dirname,
    libraryTarget: "commonjs2"
  },

  target: "node",

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      options: {
        cacheDirectory: DEBUG,
        babelrc: false,
        presets: [
          "react",
          ["es2015", {modules: false}],
          "stage-0",
        ]
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({"process.env.BROWSER": false}),
    new webpack.DefinePlugin({__DEV__: process.env.NODE_ENV === "development"}),

    new webpack.BannerPlugin({
      banner: `require("source-map-support").install()`,
      options: {raw: true, entryOnly: false}
    }),

    new webpack.IgnorePlugin(/\.(css|less|scss)$/)
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  externals: [
    /^\.\/assets$/,
    (context, request, cb) => {
      cb(null, Boolean(request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)))
    },
  ],

  devtool: "source-map"
}
