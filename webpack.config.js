const path = require("path");

module.exports = {
  entry: "/client/index.js", // assumes your entry point is the index.js in the root of your project folder
  // mode: 'development',
  output: {
    path: path.resolve(__dirname, "public"), // assumes your bundle.js will also be in the root of your project folder
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
