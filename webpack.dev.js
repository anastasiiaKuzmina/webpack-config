const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true,
                }
            }
        })
    ],
});