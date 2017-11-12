const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const isProd = process.env.npm_lifecycle_event === 'build'

module.exports = () => {
     const config = {
          entry: './src/index.js',
          output: {
               path: __dirname + '/dist',
               publicPath: '/',
               filename: isProd
                    ? '[name].[hash].js'
                    : '[name].bundle.js',
               chunkFilename: isProd
                    ? '[name].[hash].js'
                    : '[name].bundle.js'
          },
          module: {
               rules: [
                    {
                         test: /\.js$/,
                         loader: 'babel-loader',
                         exclude: /node_modules/
                    },
                    {
                         test: /\.css$/,
                         loader: ['style-loader', 'css-loader']
                    },
                    {
                         test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                         loader: 'file-loader'
                    },
                    {
                         test: /\.html$/,
                         loader: 'raw-loader'
                    }
               ]
          },
          plugins: [
               new HtmlWebpackPlugin({
                 template: './public/index.html',
                 inject: 'body'
               })
          ],
          devServer: {
               contentBase: './public',
               stats: 'minimal',
               port: 3000
          }
     }
     if (isProd) {
          config.plugins.push(
               new webpack.NoEmitOnErrorsPlugin(),
               new webpack.optimize.UglifyJsPlugin(),
               new CopyWebpackPlugin([{
                    from: __dirname + '/public'
               }]),
               new webpack.DefinePlugin({
                    'process.env': {
                         'NODE_ENV': JSON.stringify('production')
                    }
               })
          )
     } else {
          config.plugins.push(
               new OpenBrowserPlugin({
                    url: 'http://localhost:3000'
               })
          )
     }
     return config
}
