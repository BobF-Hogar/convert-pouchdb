const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./index.js",
  target: "node",
  mode: "production",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
    ]
  },
  node: {
    __dirname: true
  },
//   optimization: {
//     minimize: false,
//   },
  output: {
    filename: "convert-pouchdb.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "**/leveldown.node", to: "leveldown.node" },
      ],
    }),
  ],
};
