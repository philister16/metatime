const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Plugins
const cleaner = new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false,
    cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './lib')]
});

const html = new HtmlWebpackPlugin({
    title: 'Hello there',
    template: './src/index.html',
});

// Configs
const generalConfig = {
    entry: './src/main.ts',
    plugins: [cleaner],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}

const nodeConfig = {
    ...generalConfig,
    name: 'node',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'main.js',
        libraryTarget: 'umd',
        libraryExport: 'default'
    }
}

const browserConfig = {
    ...generalConfig,
    name: 'browser',
    target: 'web',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'browser.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        libraryExport: 'default',
        umdNamedDefine: true,
        library: 'Metatime'
    }
}

const devServer = {
    ...browserConfig,
    plugins: [cleaner, html],
    name: 'dev-server',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
}

module.exports = [nodeConfig, browserConfig, devServer];