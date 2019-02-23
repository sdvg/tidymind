const path = require(`path`)
const CleanWebpackPlugin = require(`clean-webpack-plugin`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`)
const VueLoaderPlugin = require(`vue-loader/lib/plugin`)

const NODE_ENV = process.env.NODE_ENV || `development`
const isProduction = NODE_ENV === `production`

module.exports = {
  mode: NODE_ENV,
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: `src/index.ejs`,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? `[name].[hash].css` : `[name].css`,
    }),
    new CleanWebpackPlugin([`dist`]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          `babel-loader`,
          `eslint-loader`,
        ],
      },
      {
        test: /\.vue$/,
        loader: `vue-loader`,
      },
      {
        test: /\.html$/,
        use: [`html-loader`],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : `vue-style-loader`,
          `css-loader`,
          `postcss-loader`,
        ],
      },
      {
        test: /\.(png|jpg|svg|woff2?|eot|gif|ttf)$/,
        use: [`file-loader`],
      },
    ],
  },
  resolve: {
    extensions: [`.js`, `.vue`, `.json`],
    alias: {
      '@': path.resolve(`./src`),
      'vue$': `vue/dist/vue.esm.js`,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendors`,
          chunks: `all`,
        },
      },
    },
  },
  devtool: isProduction ? `source-map` : `cheap-module-eval-source-map`,
  devServer: {
    contentBase: `./dist`,
    open: true,
    historyApiFallback: true,
  },
  entry: `./src/index.js`,
  output: {
    filename: `[name].[chunkhash].js`,
  },
}
