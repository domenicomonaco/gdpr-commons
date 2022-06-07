const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


var PACKAGE = require('./package.json');
var version = PACKAGE.version;
var slug = PACKAGE.slug;
var distoutput = 'dist/' + version;
let mode = 'development'

if (process.env.NODE_ENV == 'production') {
    mode = 'production';
    distoutput = 'dist/latest';
    version = 'latest';
}

module.exports = {
    mode,
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, distoutput),
        filename: slug + '.' + version + '.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        library: {
            name: 'GDPRCommons',
            type: 'umd',
            umdNamedDefine: true,
        }
    },
    module: {
        rules: [{
                test: /\.(html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico|webp)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: "blocking"
        }),
        new MiniCssExtractPlugin({
            filename: slug + '.' + version + '.css',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, distoutput),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
}