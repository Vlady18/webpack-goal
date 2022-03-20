const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}
const isDev = process.env.NODE_ENV === 'development';

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

console.log(process.env.NODE_ENV);
console.log(mode);

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    mode,
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    devtool: 'source-map',
    // context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './src/index.js']
    }, // Указываем точку входа - главный модуль приложения,
    // в который импортируются все остальные
    devServer: {
        hot: true, // Включает автоматическую перезагрузку страницы при изменениях
        port: 4200,
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'), // Директория, в которой будет
        // размещаться итоговый бандл, папка dist в корне приложения
        clean: true, // Очищает директорию dist перед обновлением бандла
        // Свойство стало доступно с версии 5.20.0, до этого использовался
        // CleanWebpackPlugin
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css'), // Формат имени файла
        }),
        // new ESLintPlugin({
        //     // emitWarning: false
        // })
    ],
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(ttf|woff2?|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                // exclude: /node_modules/, // не обрабатываем файлы из node_modules
                // loader: 'babel-loader',
                // use: ['babel-loader', "@babel/preset-react", 'eslint-loader'],
                // options: {
                //     babelrc: true,
                //     cacheDirectory: true, // Использование кэша для избежания рекомпиляции
                // // при каждом запускеW
                // },
                // use: jsLoaders()
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: true,
                    // envName: env.production ? 'production' : 'development'
                }
            },
        ]
    }
}