const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const createFileName = (filename, extension) => {
    if (isDev) {
        return `${filename}.${extension}`
    } else {
        return `${filename}.[fullhash].${extension}`
    }
}

const optimization = () => {
    let config = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new CssMinimizerPlugin()
        ]

    }

    return config
}

module.exports = {
    entry: {
        app: './js/index.js'
    },
    context: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: createFileName('[name]', 'js')
    },
    devServer: {
        port: '9000',
        hot: isDev,
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            }
        ]
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: createFileName('style', 'css')
        }),
    ]
};