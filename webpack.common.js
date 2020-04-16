const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports =  {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: true,
                        reloadAll: true,
                      },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                              autoprefixer: {
                                flexbox: 'no-2009',
                              },
                              stage: 3,
                            }),
                            require('css-mqpacker'),
                          ],
                        },
                    },
                    'sass-loader',
                  ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]'
                }
            }
        ],
    },

    resolve: {
        extensions: ['.js', '.scss'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, 'src', 'static') },
        ]),
    ],
};